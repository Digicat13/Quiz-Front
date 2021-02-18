import { createSelector } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { ITestState } from '../state/test.state';

export const selectTests = createSelector(
  (state: IAppState) => state.testState,
  (testState: ITestState) => testState.tests
);
