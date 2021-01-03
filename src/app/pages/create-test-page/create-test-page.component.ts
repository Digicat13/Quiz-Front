import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { IQuestion } from 'src/app/models/question';
import { ITest } from 'src/app/models/test';

@Component({
  selector: 'app-create-test-page',
  templateUrl: './create-test-page.component.html',
  styleUrls: ['./create-test-page.component.scss'],
})
export class CreateTestPageComponent implements OnInit {
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

  ngOnInit(): void {}

  onStepOne(test: ITest, stepper: MatStepper): void {
    this.test = test;
    stepper.next();
  }

  onStepTwo(questions: IQuestion[], stepper: MatStepper): void {
    this.test.questions = questions;
    stepper.next();
  }

  returnStepOne(stepper: MatStepper): void {
    stepper.previous();
  }

  returnStepTwo(stepper: MatStepper): void {
    stepper.previous();
  }

  onSubmit(): void {}
}
