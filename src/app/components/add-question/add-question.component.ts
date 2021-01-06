import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { IAnswer } from 'src/app/models/answer';
import { IQuestion } from 'src/app/models/question';
import { MessageDialogComponent } from '../dialogs/message-dialog/message-dialog.component';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss'],
})
export class AddQuestionComponent implements OnInit {
  @Output() stepTwoSubmit = new EventEmitter<IQuestion[]>();

  questions: IQuestion[] = [
    {
      questionText: '',
      hintText: '',
      answers: [{ answerText: '', isCorrect: false }],
    },
  ];
  noCorrectAnswerError: Map<number, boolean> = new Map();

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openDialog(header: string, message: string): void {
    const dialogRef = this.dialog.open(MessageDialogComponent);
    dialogRef.componentInstance.header = header;
    dialogRef.componentInstance.message = message;
    dialogRef.afterClosed().subscribe((result) => {});
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
      this.openDialog(
        'Cant perfom this action',
        'You need to have at least one answer'
      );
      return;
    }
    const answerIndex = question.answers.indexOf(answer);
    if (answerIndex !== -1) {
      question.answers.splice(answerIndex, 1);
    } else {
      alert('Failed to delete answer');
    }
  }

  onDeleteQuestion(question: IQuestion): void {
    if (this.questions.length === 1) {
      this.openDialog(
        'Cant perfom this action',
        'You need to have at least one question'
      );
      return;
    }
    const questionIndex = this.questions.indexOf(question);
    if (questionIndex !== -1) {
      this.questions.splice(questionIndex, 1);
    } else {
      alert('Failed to delete question');
    }
  }

  onSubmit(form: NgForm): void {
    console.log(form);
    console.log(this.questions);
    if (form.invalid) {
      return;
    }

    this.validateAnswers();
    if (this.noCorrectAnswerError.size > 0) {
      return;
    }

    this.questions.forEach((q) => {
      if (q?.hintText?.trim() === '') {
        delete q.hintText;
      }
    });

    this.stepTwoSubmit.emit(this.questions);
  }

  clearAnswerError(): void {
    this.noCorrectAnswerError = new Map();
  }

  validateAnswers(): void {
    this.noCorrectAnswerError = new Map();
    this.questions.forEach((q, qIndex) => {
      let correct = false;
      q.answers.forEach((answer) => {
        if (answer.isCorrect) {
          correct = true;
        }
      });
      if (!correct) {
        this.noCorrectAnswerError.set(qIndex, true);
      }
    });
  }
}
