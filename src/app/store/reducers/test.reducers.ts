import { createReducer, on } from '@ngrx/store';
import { PagedList } from 'src/app/models/PagedList';
import { TestActions } from '../actions/test.actions';
import { initialTestState } from '../state/test.state';

export const testReducer = createReducer(
  initialTestState,
  on(TestActions.GetTestSuccess, (state, action) => ({
    ...state,
    test: action.test,
  })),
  on(TestActions.GetTestsSuccess, (state, action) =>
    //   tests: action.tests;
    // })
    ({
      ...state,
      tests: new PagedList(
        action.tests,
        action.tests.totalCount,
        action.tests.currentPage,
        action.tests.pageSize,
        action.tests.totalPages
      ),
    })
  )
);
