import { Component, Input } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { MatSelectionListChange } from '@angular/material/list';
import { IQuestion } from 'src/app/models/question';

@Component({
  selector: 'app-test-question',
  templateUrl: './test-question.component.html',
  styleUrls: ['./test-question.component.scss'],
})
export class TestQuestionComponent {
  @Input() question: IQuestion;
  @Input() questionForm: FormGroup;

  constructor() {}

  get answers(): FormArray {
    return this.questionForm.get('answers') as FormArray;
  }

  onSelectRadioListItem(selectedOption: MatSelectionListChange): void {
    const answer = selectedOption.options[0].value.controls;
    this.answers.controls.forEach((answerControl) => {
      if (answerControl.get('id').value === answer?.id?.value) {
        answerControl.patchValue({ selected: true });
      } else {
        answerControl.patchValue({ selected: false });
      }
    });
  }

  onSelectMultipleListItem(selectedOption: MatSelectionListChange): void {
    const isSelected: boolean = selectedOption.options[0].value.value;
    selectedOption.options[0].value.setValue(!isSelected);
  }
}
