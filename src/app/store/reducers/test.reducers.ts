import { createReducer, on } from '@ngrx/store';
import { TestActions } from '../actions/test.actions';
import { initialTestState } from '../state/test.state';

export const testReducer = createReducer(
  initialTestState,
  on(TestActions.GetTestsSuccess, (state, action) => ({
    ...state,
    tests: action.tests,
  }))
);
