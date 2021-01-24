import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { MatSelectionListChange } from '@angular/material/list';
import { IAnswer } from 'src/app/models/answer';
import { IQuestion } from 'src/app/models/question';

@Component({
  selector: 'app-test-question',
  templateUrl: './test-question.component.html',
  styleUrls: ['./test-question.component.scss'],
})
export class TestQuestionComponent implements OnInit {
  @Input() question: IQuestion;
  // @Output() selectAnswer = new EventEmitter<IAnswer[]>();
  // selectedAnswers: IAnswer[] = [];
  @Input() questionForm: FormGroup;

  constructor() {}

  ngOnInit(): void {}

  get answers(): FormArray {
    return this.questionForm.get('answers') as FormArray;
  }

  // onAnswerSelectionChange(): void {
  //   this.selectAnswer.emit(this.selectedAnswers);
  // }

  onSelectRadioListItem(selectedOption: MatSelectionListChange): void {
    const answer = selectedOption.options[0].value.controls;
    this.answers.controls.forEach((answerControl) => {
      if (answerControl.get('id').value === answer?.id?.value) {
        // console.log('true');
        answerControl.patchValue({ selected: true });
      } else {
        // console.log('false');
        answerControl.patchValue({ selected: false });
      }
    });
  }

  onSelectMultipleListItem(selectedOption: MatSelectionListChange): void {
    // console.log(selectedOption.options[0].value.value);
    const isSelected: boolean = selectedOption.options[0].value.value;
    selectedOption.options[0].value.setValue(!isSelected);
  }
}
