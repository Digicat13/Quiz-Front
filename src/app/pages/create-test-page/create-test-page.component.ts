import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { MessageDialogComponent } from 'src/app/components/dialogs/message-dialog/message-dialog.component';
import { IAnswer } from 'src/app/models/answer';
import { IQuestion } from 'src/app/models/question';
import { ITest } from 'src/app/models/test';
import { TestService } from 'src/app/services/test.service';
import { correctAnswersCountValidator } from 'src/app/validators/correct-answers-count.validator';

@Component({
  selector: 'app-create-test-page',
  templateUrl: './create-test-page.component.html',
  styleUrls: ['./create-test-page.component.scss'],
})
export class CreateTestPageComponent {
  test: ITest;
  testForm: FormGroup = this.fb.group({
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
    questions: this.fb.array([
      this.fb.group({
        questionText: [, [Validators.required]],
        hintText: [],
        answers: this.fb.array(
          [
            this.fb.group({
              isCorrect: false,
              answerText: [, [Validators.required]],
            }),
          ],
          [correctAnswersCountValidator()]
        ),
      }),
    ]),
  });

  constructor(
    private testService: TestService,
    private router: Router,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {}

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

  onSubmit(): void {
    this.testService.createTest(this.test).subscribe(
      () => {
        this.openMessageDialog('successfully-created');
        this.router.navigate(['/home-page']);
      },
      (error) => {
        this.openMessageDialog('failed-create-quiz');
      }
    );
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
