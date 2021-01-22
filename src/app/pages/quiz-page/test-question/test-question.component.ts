import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { IAnswer } from 'src/app/models/answer';
import { IQuestion } from 'src/app/models/question';

@Component({
  selector: 'app-test-question',
  templateUrl: './test-question.component.html',
  styleUrls: ['./test-question.component.scss'],
})
export class TestQuestionComponent implements OnInit {
  @Input() question: IQuestion;
  @Output() selectAnswer = new EventEmitter<IAnswer[]>();
  selectedAnswers: IAnswer[] = [];
  questionForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.questionForm = this.fb.group({
      answersArray: this.fb.array([]),
    });
  }

  ngOnInit(): void {}

  get answersArray(): FormArray {
    return this.questionForm.get('answersArray') as FormArray;
  }

  correctAnswerCount(): number {
    const correctAnswers = this.question.answers.filter(
      (answer: IAnswer) => answer.isCorrect === true
    );
    return correctAnswers.length;
  }

  onAnswerSelectionChange(): void {
    this.selectAnswer.emit(this.selectedAnswers);
  }

  onSelectAnswer(event): void {
    console.log(event);
  }

  getAnswers(): void {
    // this.answersArray.push(new FormControl());
    this.question.answers.forEach((answer: IAnswer) => {
      this.answersArray.push(new FormControl(null, []));
    });
  }
}
