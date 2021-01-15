import { Component, Input } from '@angular/core';
import { IAnswer } from 'src/app/models/answer';
import { IQuestion } from 'src/app/models/question';

@Component({
  selector: 'app-test-question',
  templateUrl: './test-question.component.html',
  styleUrls: ['./test-question.component.scss'],
})
export class TestQuestionComponent {
  @Input() question: IQuestion;

  constructor() {}

  correctAnswerCount(): number {
    const correctAnswers = this.question.answers.filter(
      (answer: IAnswer) => answer.isCorrect === true
    );
    return correctAnswers.length;
  }
}
