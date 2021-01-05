import { Component, OnInit } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { IQuestion } from 'src/app/models/question';
import { ITest } from 'src/app/models/test';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-create-test-page',
  templateUrl: './create-test-page.component.html',
  styleUrls: ['./create-test-page.component.scss'],
})
export class CreateTestPageComponent implements OnInit {
  test: ITest;

  constructor(private testService: TestService) {}

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

  onSubmit(test: ITest): void {
    console.log(test);
    this.testService.createTest(test).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
