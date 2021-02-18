import { createAction, props } from '@ngrx/store';
import { SortingProperty } from 'src/app/components/sorting-chip-list/sorting-chip-list.component';
import { PagedList } from 'src/app/models/PagedList';
import { ITest } from 'src/app/models/test';

export enum ETestActions {
  GetTests = '[Test] Get Tests',
  GetTestsSuccess = '[Test] Get Tests Success',
}

export class TestActions {
  static GetTests = createAction(
    ETestActions.GetTests,
    props<{
      pageNumber: number;
      pageSize: number;
      orderBy?: SortingProperty;
    }>()
  );

  static GetTestsSuccess = createAction(
    ETestActions.GetTestsSuccess,
    props<{ tests: PagedList<ITest> }>()
  );

  constructor() {}
}
