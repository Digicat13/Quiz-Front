import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { IAnswer } from 'src/app/models/answer';
import { IQuestion } from 'src/app/models/question';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss'],
})
export class AddQuestionComponent implements OnInit {
  // questions: IQuestion[] = [
  //   {
  //     questionText: '',
  //     hintText: '',
  //     answers: [{ answerText: '', isCorrect: false }],
  //   },
  // ];

  get questions(): FormArray { return this.questionsForm.get('questions') as FormArray; }


  
  questionsForm = new FormGroup({
    question: new FormArray([
      new FormGroup({
        questionText: new FormControl(),
        hint: new FormControl(),
        answers: new FormArray([
          new FormGroup({
            answerText: new FormControl(),
            isCorrect: new FormControl(),
          }),
        ]),
      }),
    ]),
  });

  constructor(public dialog: MatDialog) {}

  addQuestionForm = new FormGroup({
    questionText: new FormControl(),
    hint: new FormControl(),
  });

  addAnswerForm = new FormGroup({
    answerText: new FormControl(),
    isCorrect: new FormControl(),
  });

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
    const questions: IQuestion[] = [];
    for (let i = 0; i < this.questions.length; i++) {
      questions.push({
        questionText: this.addQuestionForm.get('questionText').value,
        hintText: this.addQuestionForm.get('hint').value,
        answers: this.addQuestionForm.get('answers').value,
        //         id?: string;
        // testId?: string;
        // questionText: string;
        // hintText?: string;
        // answers: Array<IAnswer>;
      });
    }
    console.log(this.questions);
  }
}
