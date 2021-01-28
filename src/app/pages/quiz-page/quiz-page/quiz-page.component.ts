import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { IAnswer } from 'src/app/models/answer';
import { IQuestion } from 'src/app/models/question';
import { ITest } from 'src/app/models/test';
import { ITesting } from 'src/app/models/testing';
import { TestService } from 'src/app/services/test.service';
import { TestingService } from 'src/app/services/testing.service';
import { ITestingResult } from 'src/app/models/testingResult';
import { ITestingResultAnswer } from 'src/app/models/testingResultAnswer';
import * as moment from 'moment';
import { TestingResultService } from 'src/app/services/testingResult.service';
import { Subject } from 'rxjs';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from 'src/app/components/dialogs/message-dialog/message-dialog.component';

@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.scss'],
})
export class QuizPageComponent implements OnInit {
  testingId: string;
  testing: ITesting;
  test: ITest;
  currentQuestionIndex: number;
  answeredQuestions: IQuestion[] = new Array<IQuestion>();
  currentQuestionSelectedAnswers: IAnswer[] = new Array<IAnswer>();
  testingResult: ITestingResult = {};
  testingStartDateTime: Date;
  testingAnswers: ITestingResultAnswer[] = new Array<ITestingResultAnswer>();
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
    private testService: TestService,
    private testingService: TestingService,
    private testingResultService: TestingResultService,
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.testingId = params.get('id');
    });
  }

  async ngOnInit(): Promise<void> {
    await this.getTesting(this.testingId);
    this.getTest(this.testing?.testId);
  }

  async getTesting(testingId: string): Promise<void> {
    await this.testingService
      .getTesting(testingId)
      .toPromise()
      .then(
        (testing: ITesting) => {
          this.testing = testing;
        },
        (error) => {
          console.log('Failed to retrieve test');
        }
      );
  }

  getTest(testId: string): void {
    this.testService.getQuiz(testId).subscribe(
      (test: ITest) => {
        this.test = test;
        this.InitTestForm();
      },
      (error) => {
        console.log('Failed to retrieve test');
      }
    );
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
  }

  CreateTestAnswers(answers: IAnswer[]): FormArray {
    const array = new FormArray([]);
    answers.forEach((answer: IAnswer) => {
      array.push(
        this.fb.group({
          id: answer.id,
          selected: false,
          answerText: [answer.answerText, []],
        })
      );
    });
    return array;
  }

  nextQuestion(): void {
    if (this.currentQuestionIndex !== this.test?.questions?.length - 1) {
      this.currentQuestionIndex++;
    }

    this.onNextQuestion.next();
  }

  onSubmit(quizDurationSeconds: number): void {
    const testingResult: ITesting = this.getTestingResult(quizDurationSeconds);
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
      this.openMessageDialog('You dont have any attempts');
      return;
    }
    if (moment(this.testing?.allowedStartDate) > moment()) {
      this.openMessageDialog('The quiz is not available yet');
      return;
    }
    if (moment(this.testing?.allowedEndDate) < moment()) {
      this.openMessageDialog('The quiz link is expired');
      return;
    }
    if (!this.testing?.intervieweeName) {
      this.testing.intervieweeName = interviewee;
    }
    this.currentQuestionIndex = 0;
    this.testingStartDateTime = moment().toDate();
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
}
