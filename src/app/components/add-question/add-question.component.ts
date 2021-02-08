import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { correctAnswersCountValidator } from 'src/app/validators/correct-answers-count.validator';
import { MessageDialogComponent } from '../dialogs/message-dialog/message-dialog.component';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss'],
})
export class AddQuestionComponent {
  @Output() questionsSubmit = new EventEmitter();
  @Output() questionDelete = new EventEmitter<string>();
  @Output() answerDelete = new EventEmitter<string>();
  @Input() testForm: FormGroup;
  submitted = false;

  constructor(public dialog: MatDialog, private fb: FormBuilder) {}

  get questionsArray(): FormArray {
    return this.testForm.controls.questions as FormArray;
  }

  getAnswersArray(questionIndex: number): FormArray {
    return (this.questionsArray.controls[questionIndex] as FormGroup).controls
      .answers as FormArray;
  }

  openDialog(header: string, message: string): void {
    const dialogRef = this.dialog.open(MessageDialogComponent);
    dialogRef.componentInstance.header = header;
    dialogRef.componentInstance.message = message;
    dialogRef.afterClosed().subscribe((result: any) => {});
  }

  onAddQuestion(): void {
    this.questionsArray.push(
      this.fb.group({
        id: [],
        questionText: [, [Validators.required]],
        hintText: [],
        answers: this.fb.array(
          [
            this.fb.group({
              id: [],
              isCorrect: false,
              answerText: [, [Validators.required]],
            }),
          ],
          [correctAnswersCountValidator()]
        ),
      })
    );
  }

  onAddAnswer(questionIndex: number): void {
    this.getAnswersArray(questionIndex).push(
      this.fb.group({
        id: [],
        isCorrect: false,
        answerText: [, [Validators.required]],
      })
    );
  }

  onDeleteAnswer(questionIndex: number, index: number): void {
    if (this.getAnswersArray(questionIndex).length === 1) {
      this.openDialog('cant-perfom-action', 'at-least-one-answer');
      return;
    }

    if (this.testForm.get('id')?.value) {
      const answerId: string = this.getAnswersArray(questionIndex).controls[
        index
      ].get('id')?.value;
      if (answerId) {
        this.answerDelete.emit(answerId);
      }
    }

    this.getAnswersArray(questionIndex).removeAt(index);
  }

  onDeleteQuestion(index: number): void {
    if (this.questionsArray.length === 1) {
      this.openDialog('cant-perfom-action', 'at-least-one-question');
      return;
    }
    if (this.testForm.get('id')?.value) {
      const questionId: string = this.questionsArray.controls[index]?.get('id')
        ?.value;
      if (questionId) {
        this.questionDelete.emit(questionId);
      }
    }

    this.questionsArray.removeAt(index);
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.testForm.invalid) {
      this.openDialog('', 'fill-questions-properly');
      return;
    }

    this.questionsSubmit.emit();
    this.submitted = false;
  }
}
