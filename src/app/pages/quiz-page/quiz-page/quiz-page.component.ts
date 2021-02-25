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
import { filter } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { QuizSelectors } from 'src/app/store/selectors/quiz.selectors';
import { QuizActions } from 'src/app/store/actions/quiz.actions';
import { IAppState } from 'src/app/store/state/app.state';
import * as lodash from 'lodash-es';
import { Moment } from 'moment';

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
    private store: Store<IAppState>
  ) {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.testingId = params.get('id');
    });
  }

  ngOnInit(): void {
    let isQuizStarted;
    this.store
      .select(QuizSelectors.selectIsStarted)
      .subscribe((isStarted: boolean) => {
        isQuizStarted = isStarted;
      });

    if (isQuizStarted) {
      this.continueQuiz();
    } else {
      this.store.dispatch(QuizActions.ClearQuizState());
      this.getQuizFromServer();
    }
  }

  continueQuiz(): void {
    this.store
      .pipe(
        select(QuizSelectors.selectTesting),
        filter((val) => val !== null)
      )
      .subscribe((testing: ITesting) => {
        this.testing = lodash.cloneDeep(testing);
      });

    this.store
      .pipe(
        select(QuizSelectors.selectQuiz),
        filter((val) => val !== null)
      )
      .subscribe((test: ITest) => {
        this.test = lodash.cloneDeep(test);
        if (this.test.questionTimeLimit) {
          this.test.questionTimeLimit = moment(
            this.test.questionTimeLimit,
            'HH:mm:ss'
          );
        } else if (this.test.testTimeLimit) {
          this.test.testTimeLimit = moment(this.test.testTimeLimit, 'HH:mm:ss');
        }
      });

    this.store
      .pipe(
        select(QuizSelectors.selectDate),
        filter((val) => val !== null)
      )
      .subscribe((date: Date) => {
        this.testingStartDateTime = date;
      });

    this.store
      .pipe(
        select(QuizSelectors.selectCurrentQuestionIndex),
        filter((val) => val !== null)
      )
      .subscribe((questionIndex: number) => {
        this.currentQuestionIndex = questionIndex;
      });

    this.store
      .pipe(
        select(QuizSelectors.selectTestForm),
        filter((val) => val !== null)
      )
      .subscribe((testFormValue: any) => {
        this.setTestForm(testFormValue);
      });
  }

  getQuizFromStore(): void {
    this.store
      .pipe(
        select(QuizSelectors.selectTesting),
        filter((val) => val !== null)
      )
      .subscribe((testing: ITesting) => {
        this.testing = lodash.cloneDeep(testing);
      });

    this.store
      .pipe(
        select(QuizSelectors.selectQuiz),
        filter((val) => val !== null)
      )
      .subscribe((test: ITest) => {
        this.test = lodash.cloneDeep(test);
        if (this.test.questionTimeLimit) {
          this.test.questionTimeLimit = moment(
            this.test.questionTimeLimit,
            'HH:mm:ss'
          );
        } else if (this.test.testTimeLimit) {
          this.test.testTimeLimit = moment(this.test.testTimeLimit, 'HH:mm:ss');
        }
        this.InitTestForm();
      });
  }

  getQuizFromServer(): void {
    this.store.dispatch(
      QuizActions.GetQuizByTestingId({ testingId: this.testingId })
    );
    this.getQuizFromStore();
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

  InitTestForm(): void {
    this.testForm.setValue({
      id: this.test.id,
      name: this.test.name,
      description: this.test.description,
      testTimeLimit: this.test.testTimeLimit,
      questionTimeLimit: this.test.questionTimeLimit,
      questions: [],
    });

    const control = this.testForm.controls.questions as FormArray;
    this.test.questions.forEach((question: IQuestion) => {
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

    this.store.dispatch(
      QuizActions.ChangeTestForm({ testFormValue: this.testForm.value })
    );
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

      this.store.dispatch(
        QuizActions.ChangeCurrentQuestionIndex({
          questionIndex: this.currentQuestionIndex,
        })
      );
    }

    this.onNextQuestion.next();
  }

  onSubmit(quizDurationSeconds: number): void {
    const testingResult: ITesting = this.getTestingResult(quizDurationSeconds);

    this.store.dispatch(QuizActions.ChangeQuizStatus({ isStarted: false }));

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

        this.store.dispatch(
          QuizActions.GetTestingSuccess({ testing: this.testing })
        );
        this.store.dispatch(
          QuizActions.ChangeQuizDate({
            testingStartDateTime: this.testingStartDateTime,
          })
        );
        this.store.dispatch(QuizActions.ChangeQuizStatus({ isStarted: true }));

        if (this.test.questionTimeLimit) {
          const timeout = this.getMiliseconds(this.test.questionTimeLimit);
          this.store.dispatch(QuizActions.ChangeTimeout({ timeout }));
        } else if (this.test.testTimeLimit) {
          const timeout = this.getMiliseconds(this.test.testTimeLimit);
          this.store.dispatch(QuizActions.ChangeTimeout({ timeout }));
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
