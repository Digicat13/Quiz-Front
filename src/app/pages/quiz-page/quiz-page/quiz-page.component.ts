import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { IAnswer } from 'src/app/models/answer';
import { IQuestion } from 'src/app/models/question';
import { ITest } from 'src/app/models/test';
import { ITesting } from 'src/app/models/testing';
import { TestService } from 'src/app/services/test.service';
import { TestingService } from 'src/app/services/testing.service';
import * as lodash from 'lodash-es';
import { ITestingResult } from 'src/app/models/testingResult';
import { ITestingResultAnswer } from 'src/app/models/testingResultAnswer';
import * as moment from 'moment';
import { TestingResultService } from 'src/app/services/testingResult.service';
import { Subject } from 'rxjs';

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

  constructor(
    private activatedRoute: ActivatedRoute,
    private testService: TestService,
    private testingService: TestingService,
    private testingResultService: TestingResultService
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
    this.testService.getTest(testId).subscribe(
      (test: ITest) => {
        this.test = test;
      },
      (error) => {
        console.log('Failed to retrieve test');
      }
    );
  }

  nextQuestion(): void {
    this.getAnswers();
    this.currentQuestionSelectedAnswers = [];

    if (this.currentQuestionIndex !== this.test?.questions?.length - 1) {
      this.currentQuestionIndex++;
    }

    this.onNextQuestion.next();
  }

  onSelectAnswer(selectedAnswers): void {
    this.currentQuestionSelectedAnswers = lodash.cloneDeep(selectedAnswers);
  }

  initAnsweredQuestionsArray(): void {
    this.answeredQuestions = lodash.cloneDeep(this.test.questions);
    this.answeredQuestions.forEach((question) => {
      question.answers = [];
    });
  }

  onSubmit(quizDurationSeconds: number): void {
    this.getAnswers();
    const testingResult: ITesting = this.getTestingResult(quizDurationSeconds);
    this.testingResultService.createTestingResult(testingResult).subscribe(
      (result) => {
        console.log(result);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  startQuiz(interviewee: string): void {
    if (!this.testing?.intervieweeName) {
      this.testing.intervieweeName = interviewee;
    }

    this.currentQuestionIndex = 0;
    this.testingStartDateTime = new Date();
  }

  getTestingResult(quizDurationSeconds: number): ITestingResult {
    const testingResult: ITestingResult = {};
    testingResult.testingId = this.testingId;
    testingResult.intervieweeName = this.testing.intervieweeName;
    testingResult.selectedAnswers = this.testingAnswers;
    testingResult.testingStartDateTime = this.testingStartDateTime;
    testingResult.duration = moment.utc(
      moment.duration({ seconds: quizDurationSeconds }).asMilliseconds()
    );
    return testingResult;
  }

  getAnswers(): void {
    if (this.answeredQuestions?.length === 0) {
      this.initAnsweredQuestionsArray();
    }

    this.answeredQuestions[this.currentQuestionIndex].answers = [
      ...this.currentQuestionSelectedAnswers,
    ];

    this.currentQuestionSelectedAnswers.forEach((answer) => {
      this.testingAnswers.push({
        testAnswerId: answer.id,
        testQuestionId: answer.testQuestionId,
      });
    });
  }

  endQuiz(): void {
    this.onEndQuiz.next();
  }
}
