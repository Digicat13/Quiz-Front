import { FormGroup } from '@angular/forms';
import { ITest } from 'src/app/models/test';
import { ITesting } from 'src/app/models/testing';

export interface IQuizState {
  test: ITest;
  testing: ITesting;
  isStarted: boolean;
  currentQuestionIndex: number;
  testingStartDateTime: Date;
  quizDuration: number;
  timeout: number;
  testFormValue: any;
}

export const initialQuizState = {
  test: null,
  testing: null,
  isStarted: false,
  currentQuestionIndex: 0,
  testingStartDateTime: null,
  quizDuration: 0,
  timeout: 0,
  testFormValue: {},
};
