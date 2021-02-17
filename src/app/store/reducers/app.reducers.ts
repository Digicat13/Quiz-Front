import { ActionReducerMap } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { quizReducer } from './quiz.reducers';
import { testReducer } from './test.reducers';

export const appReducers: ActionReducerMap<IAppState, any> = {
  testState: testReducer,
  quizState: quizReducer
};
