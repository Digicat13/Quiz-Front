import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { PagedList } from 'src/app/models/PagedList';
import { ITest } from 'src/app/models/test';
import { TestService } from 'src/app/services/test.service';
import { TestActions } from '../actions/test.actions';

@Injectable()
export class TestEffects {
  getTests$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(TestActions.GetTests),
      mergeMap((action) =>
        this.testService
          .getAll(action.pageNumber, action.pageSize, action.orderBy)
          .pipe(
            map((tests: PagedList<ITest>) =>
              TestActions.GetTestsSuccess({ tests })
            ),
            catchError((error) => EMPTY)
          )
      )
    )
  );

  constructor(private actions$: Actions, private testService: TestService) {}
}
