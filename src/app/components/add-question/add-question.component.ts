import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
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
  noCorrectAnswerError: Map<number, boolean> = new Map();
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
        answers: this.fb.array([
          this.fb.group({
            id: [],
            isCorrect: false,
            answerText: [, [Validators.required]],
          }),
        ]),
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
      this.openDialog(
        'Cant perfom this action',
        'You need to have at least one answer'
      );
      return;
    }

    if (this.testForm.get('id').value) {
      const answerId: string = this.getAnswersArray(questionIndex).controls[
        index
      ].get('id').value;
      if (answerId) {
        this.answerDelete.emit(answerId);
      }
    }

    this.getAnswersArray(questionIndex).removeAt(index);
  }

  onDeleteQuestion(index: number): void {
    if (this.questionsArray.length === 1) {
      this.openDialog(
        'Cant perfom this action',
        'You need to have at least one question'
      );
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
    this.validateAnswers();
    if (this.noCorrectAnswerError.size > 0) {
      this.openDialog(
        '',
        'You need to have at least one correct answer in each question'
      );
      return;
    }

    if (this.testForm.invalid) {
      return;
    }

    this.questionsSubmit.emit();
  }

  clearAnswerError(): void {
    this.noCorrectAnswerError = new Map();
  }

  validateAnswers(): void {
    this.noCorrectAnswerError = new Map();
    this.questionsArray.controls.forEach(
      (questionControl: AbstractControl, qIndex: number) => {
        let isValid = false;
        (questionControl.get('answers') as FormArray).controls.forEach(
          (answerControl: AbstractControl) => {
            if (answerControl.get('isCorrect').value === true) {
              isValid = true;
            }
          }
        );
        if (!isValid) {
          this.noCorrectAnswerError.set(qIndex, true);
        }
      }
    );
  }
}
