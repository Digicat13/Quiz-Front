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

  test: ITest;
  constructor() {}

  createTestForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    timeOption: new FormControl(null),
    testTimeLimit: new FormGroup({
      hours: new FormControl(null, [Validators.pattern('^[0-9]$')]),
      minutes: new FormControl(null, [Validators.pattern('^[0-5]?[0-9]$')]),
    }),
    questionTimeLimit: new FormGroup({
      minutes: new FormControl(null, [Validators.pattern('[0-9]{0,2}')]),
      seconds: new FormControl(null, [Validators.pattern('[0-5]?[0-9]')]),
    }),
  });

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.createTestForm.invalid) {
      return;
    }
    const test: ITest = {};
    // const test = {
    //   name: '',
    //   description: '',
    //   testTimeLimit: { hours: 0, minutes: 0 },
    //   questionTimeLimit: { hours: 0, minutes: 0 },
    //   questions: [
    //     {
    //       questionText: '',
    //       hintText: '',
    //       answers: [{ answerText: '', isCorrect: false }],
    //     },
    //   ],
    // };

    if (this.createTestForm.get('timeOption').value === 'testTime') {
      const hours = + this.createTestForm.get('testTimeLimit.hours').value;
      const minutes = + this.createTestForm.get('testTimeLimit.minutes').value;
      if (hours || minutes) {
        // this.test.testTimeLimit.hours = hours ? hours : 0;
        // this.test.testTimeLimit.minutes = minutes ? minutes : 0;
        test.testTimeLimit = {
          hours: hours ? hours : 0,
          minutes: minutes ? minutes : 0,
        };
        // test.testTimeLimit.hours = hours ? hours : 0;
        // test.testTimeLimit.minutes = minutes ? minutes : 0;
      } else {
        return;
      }
    } else if (this.createTestForm.get('timeOption').value === 'questionTime') {
      const minutes = + this.createTestForm.get('questionTimeLimit.minutes')
        .value;
      const seconds = + this.createTestForm.get('questionTimeLimit.seconds')
        .value;
      if (minutes || seconds) {
        test.questionTimeLimit = {
          minutes: minutes ? minutes : 0,
          seconds: seconds ? seconds : 0,
        };
        // this.test.questionTimeLimit.minutes = minutes ? minutes : 0;
        // this.test.questionTimeLimit.seconds = minutes ? minutes : 0;
        // test.questionTimeLimit.minutes = minutes ? minutes : 0;
        // test.questionTimeLimit.seconds = seconds ? seconds : 0;
      } else {
        return;
      }
    }

    // this.test.name = this.createTestForm.get('name').value;
    // this.test.description = this.createTestForm.get('description').value;
    test.name = this.createTestForm.get('name').value;
    test.description = this.createTestForm.get('description').value;

    this.test = test;
    console.log(test);
    console.log(this.test);
    this.stepOneSubmit.emit(this.test);
  }
}
