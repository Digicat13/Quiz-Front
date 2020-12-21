import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IAnswer } from 'src/app/models/answer';
import { IQuestion } from 'src/app/models/question';
import { ITest } from 'src/app/models/test';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss'],
})
export class AddQuestionComponent implements OnInit {
  @Input() test: ITest;
  @Output() questionsSubmit = new EventEmitter<ITest>();

  questions: IQuestion[] = [
    {
      questionText: '',
      hintText: '',
      answers: [{ answerText: '', isCorrect: false }],
    },
  ];

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openDialog(): void {
    const dialogRef = this.dialog.open(MessageDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  onAddQuestion(): void {
    this.questions.push({
      questionText: '',
      hintText: '',
      answers: [{ answerText: '', isCorrect: false }],
    });
  }

  onAddAnswer(question: IQuestion): void {
    question.answers.push({ answerText: '', isCorrect: false });
  }

  onDeleteAnswer(question: IQuestion, answer: IAnswer): void {
    if (question.answers.length === 1) {
      this.openDialog();
      return;
    }
    const answerIndex = question.answers.indexOf(answer);
    if (answerIndex !== -1) {
      question.answers.splice(answerIndex, 1);
    } else {
      alert('Filed to delete answer');
    }
  }

  onDeleteQuestion(question: IQuestion): void {
    if (this.questions.length === 1) {
      this.openDialog();
      return;
    }
    const questionIndex = this.questions.indexOf(question);
    if (questionIndex !== -1) {
      this.questions.splice(questionIndex, 1);
    } else {
      alert('Filed to delete question');
    }
  }

  onSubmit(): void {
    this.questions.forEach((q) => {
      if (q.hintText.trim() === '') {
        delete q.hintText;
      }
    });

    this.test.questions = this.questions;
    this.questionsSubmit.emit(this.test);
    console.log(this.questions);
  }
}
