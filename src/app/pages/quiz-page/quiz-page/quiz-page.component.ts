import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { IQuestion } from 'src/app/models/question';
import { ITest } from 'src/app/models/test';
import { ITesting } from 'src/app/models/testing';
import { TestingService } from 'src/app/services/testing.service';
import { ITestingResult } from 'src/app/models/testingResult';
import { ITestingResultAnswer } from 'src/app/models/testingResultAnswer';
import * as moment from 'moment';
import { TestingResultService } from 'src/app/services/testingResult.service';
import { Subject } from 'rxjs';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from 'src/app/components/dialogs/message-dialog/message-dialog.component';
import { Moment } from 'moment';
import { StoreQuizService } from 'src/app/services/storeQuiz.service';

@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.scss'],
})
export class QuizPageComponent implements OnInit {
  testingId: string;
  testing: ITesting;
  test: ITest;
  currentQuestionIndex: number = undefined;

  testingResult: ITestingResult = {};
  testingStartDateTime: Date;

  onNextQuestion: Subject<void> = new Subject<void>();
  onEndQuiz: Subject<void> = new Subject<void>();
  testForm: FormGroup = this.fb.group({
    id: [],
    name: [],
    description: [],
    testTimeLimit: [],
    questionTimeLimit: [],
    questions: this.fb.array([]),
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private testingService: TestingService,
    private testingResultService: TestingResultService,
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private storeQuizService: StoreQuizService
  ) {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.testingId = params.get('id');
    });
  }

  ngOnInit(): void {
    let isQuizStarted;
    isQuizStarted = this.storeQuizService.isStarted;
    if (isQuizStarted === true) {
      this.continueQuiz();
    } else {
      this.initQuiz();
    }
  }

  initQuiz(): void {
    this.storeQuizService.clearQuizData();
    this.storeQuizService
      .getTesting(this.testingId)
      .subscribe((testing: ITesting) => {
        this.testing = testing;
      });
    this.storeQuizService.getQuiz(this.testingId).subscribe((test: ITest) => {
      this.test = test;
      this.setTestForm(this.test);
    });
  }

  continueQuiz(): void {
    this.storeQuizService
      .getTesting(this.testingId)
      .subscribe((testing: ITesting) => {
        this.testing = testing;
      });
    this.storeQuizService.getQuiz(this.testingId).subscribe((test: ITest) => {
      this.test = test;
    });
    this.storeQuizService
      .getCurrentQuestionIndex()
      .subscribe((index: number) => {
        this.currentQuestionIndex = index;
      });
    this.storeQuizService.getFormValue().subscribe((formValue: any) => {
      this.setTestForm(formValue);
    });
    this.storeQuizService.getStartDate().subscribe((date: Date) => {
      this.testingStartDateTime = date;
    });
  }

  setTestForm(testFormValue: any): void {
    this.testForm.setValue({
      id: testFormValue.id,
      name: testFormValue.name,
      description: testFormValue.description,
      testTimeLimit: testFormValue.testTimeLimit,
      questionTimeLimit: testFormValue.questionTimeLimit,
      questions: [],
    });

    const control = this.testForm.controls.questions as FormArray;
    testFormValue.questions.forEach((question: IQuestion) => {
      control.push(
        this.fb.group({
          id: question.id,
          testId: question.testId,
          questionText: question.questionText,
          hintText: question.hintText,
          correctAnswersCount: question.correctAnswersCount,
          answers: this.CreateTestAnswers(question.answers),
        })
      );
    });
  }

  CreateTestAnswers(answers: any): FormArray {
    const array = new FormArray([]);
    answers.forEach((answer: any) => {
      array.push(
        this.fb.group({
          id: answer.id,
          selected: answer.selected ?? false,
          answerText: [answer.answerText, []],
        })
      );
    });
    return array;
  }

  nextQuestion(): void {
    if (this.currentQuestionIndex !== this.test?.questions?.length - 1) {
      this.currentQuestionIndex++;

      this.storeQuizService.setCurrentQuestionIndex(this.currentQuestionIndex);
    }

    this.onNextQuestion.next();
  }

  onSubmit(quizDurationSeconds: number): void {
    const testingResult: ITesting = this.getTestingResult(quizDurationSeconds);
    this.storeQuizService.setIsQuizStarted(false);
    this.testingResultService.createTestingResult(testingResult).subscribe(
      (result) => {
        this.router.navigate(['/result', result.id]);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  startQuiz(interviewee: string): void {
    if (this.testing?.numberOfRuns === 0) {
      this.openMessageDialog('dont-have-any-attempts');
      return;
    }
    if (moment(this.testing?.allowedStartDate) > moment()) {
      this.openMessageDialog('quiz-not-available-yet');
      return;
    }
    if (moment(this.testing?.allowedEndDate) < moment()) {
      this.openMessageDialog('quiz-link-expired');
      return;
    }
    if (!this.testing?.intervieweeName) {
      this.testing.intervieweeName = interviewee;
    }
    this.testingService.reduceTestingAttempts(this.testing).subscribe(
      (result: ITesting) => {
        this.testing = result;
        this.currentQuestionIndex = 0;
        this.testingStartDateTime = moment().toDate();
        this.storeQuizService.setIsQuizStarted(true);
        this.storeQuizService.setStartDate(this.testingStartDateTime);

        if (this.test.questionTimeLimit) {
          const timeout = this.getMiliseconds(this.test.questionTimeLimit);
          this.storeQuizService.setTimeout(timeout);
        } else if (this.test.testTimeLimit) {
          const timeout = this.getMiliseconds(this.test.testTimeLimit);

          this.storeQuizService.setTimeout(timeout);
        }
      },
      (error) => {
        this.openMessageDialog('error-occurred');
      }
    );
  }

  getTestingResult(quizDurationSeconds: number): ITestingResult {
    const testingResult: ITestingResult = {};
    testingResult.testingId = this.testingId;
    testingResult.intervieweeName = this.testing.intervieweeName;
    testingResult.testingStartDateTime = this.testingStartDateTime;
    testingResult.duration = moment.utc(
      moment.duration({ seconds: quizDurationSeconds }).asMilliseconds()
    );
    testingResult.selectedAnswers = new Array<ITestingResultAnswer>();
    this.testForm.value.questions.forEach((question) => {
      question.answers.forEach((answer) => {
        if (answer.selected === true) {
          testingResult.selectedAnswers?.push({
            testQuestionId: question.id,
            testAnswerId: answer.id,
          });
        }
      });
    });
    return testingResult;
  }

  endQuiz(): void {
    this.onEndQuiz.next();
  }

  openMessageDialog(message: string): void {
    const dialogRef = this.dialog.open(MessageDialogComponent);
    dialogRef.componentInstance.message = message;
    dialogRef.afterClosed().subscribe();
  }

  getMiliseconds(timespan: Moment): number {
    const hMiliseconds = timespan.hours() * 60 * 60 * 1000;
    const mMiliseconds = timespan.minutes() * 60 * 1000;
    const sMiliseconds = timespan.seconds() * 1000;
    return hMiliseconds + mMiliseconds + sMiliseconds;
  }
}
