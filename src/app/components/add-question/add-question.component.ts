import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { IAnswer } from 'src/app/models/answer';
import { IQuestion } from 'src/app/models/question';
import { ITest } from 'src/app/models/test';
import { TestService } from 'src/app/services/test.service';
import { MessageDialogComponent } from '../dialogs/message-dialog/message-dialog.component';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss'],
})
export class AddQuestionComponent implements OnInit {
  @Output() questionsSubmit = new EventEmitter<IQuestion[]>();
  @Output() questionDelete = new EventEmitter<string>();
  @Output() answerDelete = new EventEmitter<string>();
  @Input() testId: string;
  questions: IQuestion[] = [
    {
      questionText: '',
      hintText: '',
      answers: [{ answerText: '', isCorrect: false }],
    },
  ];
  noCorrectAnswerError: Map<number, boolean> = new Map();

  constructor(public dialog: MatDialog, private testService: TestService) {}

  async ngOnInit(): Promise<void> {
    if (this.testId) {
      await this.getTest(this.testId).then((test: ITest) => {
        this.questions = test.questions;
      });
    }
  }

  getTest(testId: string): Promise<ITest> {
    return this.testService.getTest(testId).toPromise();
  }

  openDialog(header: string, message: string): void {
    const dialogRef = this.dialog.open(MessageDialogComponent);
    dialogRef.componentInstance.header = header;
    dialogRef.componentInstance.message = message;
    dialogRef.afterClosed().subscribe((result: any) => {});
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
      this.answerDelete.emit(answer?.id);
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
      this.questionDelete.emit(question?.id);
    } else {
      alert('Failed to delete question');
    }
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    this.validateAnswers();
    if (this.noCorrectAnswerError.size > 0) {
      return;
    }

    this.questions.forEach((q: IQuestion) => {
      if (q?.hintText?.trim() === '') {
        delete q.hintText;
      }
    });

    this.questionsSubmit.emit(this.questions);
  }

  clearAnswerError(): void {
    this.noCorrectAnswerError = new Map();
  }

  validateAnswers(): void {
    this.noCorrectAnswerError = new Map();
    this.questions.forEach((q: IQuestion, qIndex: number) => {
      let correct = false;
      q.answers.forEach((answer: IAnswer) => {
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
