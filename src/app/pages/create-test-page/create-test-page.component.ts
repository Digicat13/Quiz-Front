import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ITest } from 'src/app/models/test';

@Component({
  selector: 'app-create-test-page',
  templateUrl: './create-test-page.component.html',
  styleUrls: ['./create-test-page.component.scss'],
})
export class CreateTestPageComponent implements OnInit {
  isEditable = false;
  isCompleted = true;

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
}
