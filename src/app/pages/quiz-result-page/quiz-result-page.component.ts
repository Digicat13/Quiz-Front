import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { IAnswer } from 'src/app/models/answer';
import { IQuestion } from 'src/app/models/question';
import { ITestingResult } from 'src/app/models/testingResult';
import { ITestingResultAnswer } from 'src/app/models/testingResultAnswer';
import { TestingResultService } from 'src/app/services/testingResult.service';

@Component({
  selector: 'app-quiz-result-page',
  templateUrl: './quiz-result-page.component.html',
  styleUrls: ['./quiz-result-page.component.scss'],
})
export class QuizResultPageComponent implements OnInit {
  testingResultId: string;
  testingResult: ITestingResult;
  questions: { questionId?: IQuestion; answerIds?: string[] } = {};
  questionIds = Array<string>();
  selectedAnswerIds: { answerId?: string; value?: boolean } = {};

  constructor(
    private activatedRoute: ActivatedRoute,
    private testingResultService: TestingResultService
  ) {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.testingResultId = params.get('id');
    });
  }

  getQuestion(questionId: string): IQuestion {
    const answer = this.testingResult.selectedAnswers.find(
      (answerItem: ITestingResultAnswer) =>
        answerItem.testQuestionId === questionId
    );
    return answer.testQuestion;
  }

  isAnswerSelected(answerId: string): boolean {
    return this.selectedAnswerIds[answerId];
  }

  async ngOnInit(): Promise<void> {
    await this.testingResultService
      .getTestingResult(this.testingResultId)
      .subscribe((result: ITestingResult) => {
        this.testingResult = result;
        this.testingResult.selectedAnswers.forEach(
          (answer: ITestingResultAnswer) => {
            this.selectedAnswerIds[answer.testAnswerId] = true;
            if (!this.questions[answer.testQuestionId]) {
              this.questions[answer.testQuestionId] = new Array<string>(
                answer.testAnswerId
              );
              this.questionIds.push(answer.testQuestionId);
            } else {
              this.questions[answer.testQuestionId].push(answer.testAnswerId);
            }
          }
        );
        console.log(this.questions);
      });
  }
}
