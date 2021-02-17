import { ITest } from 'src/app/models/test';
import { ITesting } from 'src/app/models/testing';

export interface IQuizState {
  test: ITest;
  testing: ITesting;
}

export const initialQuizState = {
  test: null,
  testing: null,
};
