import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import * as moment from 'moment';
import { MessageDialogComponent } from 'src/app/components/dialogs/message-dialog/message-dialog.component';
import { IAnswer } from 'src/app/models/answer';
import { IQuestion } from 'src/app/models/question';
import { ITest } from 'src/app/models/test';
import { TestService } from 'src/app/services/test.service';
import { correctAnswersCountValidator } from 'src/app/validators/correct-answers-count.validator';
import { minAnswersCountValidator } from 'src/app/validators/min-answers-count.validator';

@Component({
  selector: 'app-edit-test-page',
  templateUrl: './edit-test-page.component.html',
  styleUrls: ['./edit-test-page.component.scss'],
})
export class EditTestPageComponent implements OnInit {
  test: ITest;
  testId: string;
  questionsToDelete = new Array<{ id: string }>();
  answersToDelete = new Array<{ id: string }>();
  testForm: FormGroup = this.fb.group({
    id: [],
    name: [, [Validators.required]],
    description: [, [Validators.required]],
    timeOption: [],
    testTimeLimit: this.fb.group({
      hours: [, [Validators.pattern('^[0-9]$')]],
      minutes: [, [Validators.pattern('^[0-5]?[0-9]$')]],
    }),
    questionTimeLimit: this.fb.group({
      minutes: [, [Validators.pattern('[0-9]{0,2}')]],
      seconds: [, [Validators.pattern('[0-5]?[0-9]')]],
    }),
    questions: this.fb.array([]),
  });

  constructor(
    private testService: TestService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.testId = params.get('id');
    });
    this.testService.getTest(this.testId).subscribe((result: ITest) => {
      this.test = result;
      this.initTestForm(this.test);
    });
  }

  get name(): AbstractControl {
    return this.testForm.get('name');
  }
  get description(): AbstractControl {
    return this.testForm.get('description');
  }
  get timeOption(): AbstractControl {
    return this.testForm.get('timeOption');
  }
  get testTimeLimit(): AbstractControl {
    return this.testForm.get('testTimeLimit');
  }
  get questionTimeLimit(): AbstractControl {
    return this.testForm.get('questionTimeLimit');
  }

  initTestForm(test: ITest): void {
    this.testForm.patchValue({
      id: test.id,
      name: test.name,
      description: test.description,
      questions: [],
    });
    this.setTimeLimitControls();

    const control = this.testForm.controls.questions as FormArray;
    test.questions.forEach((question: IQuestion) => {
      control.push(
        this.fb.group({
          id: question.id,
          testId: question.testId,
          questionText: [question.questionText, [Validators.required]],
          hintText: question.hintText,
          answers: this.getAnswersArray(question.answers),
        })
      );
    });
  }

  getAnswersArray(answers: IAnswer[]): FormArray {
    const array = new FormArray(
      [],
      [correctAnswersCountValidator(), minAnswersCountValidator()]
    );
    answers.forEach((answer: IAnswer) => {
      array.push(
        this.fb.group({
          id: answer.id,
          isCorrect: answer.isCorrect,
          answerText: [answer.answerText, [Validators.required]],
        })
      );
    });
    return array;
  }

  setTimeLimitControls(): void {
    if (this.test.testTimeLimit) {
      const hours = this.test.testTimeLimit.hours();
      const minutes = this.test.testTimeLimit.minutes();
      this.testForm.patchValue({
        timeOption: 'testTime',
      });
      this.testTimeLimit.get('hours').setValue(hours);
      this.testTimeLimit.get('minutes').setValue(minutes);
    } else if (this.test.questionTimeLimit) {
      const minutes = this.test.questionTimeLimit.minutes();
      const seconds = this.test.questionTimeLimit.seconds();
      this.testForm.patchValue({
        timeOption: 'questionTime',
      });
      this.questionTimeLimit.get('minutes').setValue(minutes);
      this.questionTimeLimit.get('seconds').setValue(seconds);
    } else {
      this.testForm.patchValue({
        timeOption: null,
      });
    }
  }

  onTestPropertiesSubmit(stepper: MatStepper): void {
    stepper.next();
  }

  onQuestionsSubmit(stepper: MatStepper): void {
    this.test = this.getTestValues();
    stepper.next();
  }

  goToTestProperties(stepper: MatStepper): void {
    stepper.previous();
  }

  goToQuestions(stepper: MatStepper): void {
    stepper.previous();
  }

  onQuestionDelete(questionId: string): void {
    this.questionsToDelete.push({ id: questionId });
  }

  onAnswerDelete(answerId: string): void {
    this.answersToDelete.push({ id: answerId });
  }

  onSubmit(): void {
    this.testService.editTest(this.test).subscribe(
      () => {
        this.openMessageDialog('successfully-edited');
      },
      (error) => {
        this.openMessageDialog('failed-edit-quiz');
      }
    );

    if (this.answersToDelete.length > 0) {
      this.answersToDelete.forEach((answer: { id: string }) => {
        this.testService.deleteQuestion(answer.id).subscribe();
      });
    }
    if (this.questionsToDelete.length > 0) {
      this.questionsToDelete.forEach((question: { id: string }) => {
        this.testService.deleteQuestion(question.id).subscribe();
      });
    }

    this.router.navigate(['/home-page']);
  }

  getTestValues(): ITest {
    const test: ITest = {};
    if (this.timeOption.value === 'testTime') {
      const hours = +this.testTimeLimit.get('hours').value;
      const minutes = +this.testTimeLimit.get('minutes').value;
      if (hours || minutes) {
        test.testTimeLimit = moment()
          .hours(hours ? hours : 0)
          .minutes(minutes ? minutes : 0)
          .seconds(0);
      } else {
        return;
      }
    } else if (this.timeOption.value === 'questionTime') {
      const minutes = +this.questionTimeLimit.get('minutes').value;
      const seconds = +this.questionTimeLimit.get('seconds').value;
      if (minutes || seconds) {
        test.questionTimeLimit = moment()
          .hours(0)
          .minutes(minutes ? minutes : 0)
          .seconds(seconds ? seconds : 0);
      } else {
        return;
      }
    }
    test.id = this.test.id;
    test.name = this.name.value;
    test.description = this.description.value;
    test.questions = new Array<IQuestion>();
    this.testForm.value.questions.forEach((question: IQuestion) => {
      const answers = new Array<IAnswer>();
      question.answers.forEach((answer: IAnswer) => {
        answers.push({
          answerText: answer.answerText,
          isCorrect: answer.isCorrect,
        });
      });
      test.questions.push(question);
    });

    return test;
  }

  openMessageDialog(message: string): void {
    const dialogRef = this.dialog.open(MessageDialogComponent);
    dialogRef.componentInstance.message = message;
    dialogRef.afterClosed().subscribe();
  }
}
