import { ActionReducerMap } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { testReducer } from './test.reducers';

export const appReducers: ActionReducerMap<IAppState, any> = {
  testState: testReducer,
};
