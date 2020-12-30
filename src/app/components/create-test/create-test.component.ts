import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ITest } from 'src/app/models/test';

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.scss'],
})
export class CreateTestComponent implements OnInit {
  @Output() stepOneSubmit = new EventEmitter<ITest>();

  test: ITest = {
    name: '',
    description: '',
    testTimeLimit: { hours: 0, minutes: 0 },
    questionTimeLimit: { hours: 0, minutes: 0 },
    questions: [
      {
        questionText: '',
        hintText: '',
        answers: [{ answerText: '', isCorrect: false }],
      },
    ],
  };

  constructor() {}

  createTestForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    testTimeLimit: new FormGroup({
      hours: new FormControl(null, [Validators.pattern('^[0-9]$')]),
      minutes: new FormControl(null, [Validators.pattern('^[0-5]d$')]),
    }),
    questionTimeLimit: new FormGroup({
      minutes: new FormControl(null, [Validators.pattern('^d{2}$')]),
      seconds: new FormControl(null, [Validators.pattern('^[0-5]d$')]),
    }),
  });

  ngOnInit(): void {}

  onSubmit(): void {
    this.test.name = this.createTestForm.get('name').value;
    this.test.description = this.createTestForm.get('description').value;
    this.test.testTimeLimit = this.createTestForm.get('testTimeLimit').value;
    this.test.questionTimeLimit = this.createTestForm.get(
      'questionTimeLimit'
    ).value;

    this.stepOneSubmit.emit(this.test);
  }
}
