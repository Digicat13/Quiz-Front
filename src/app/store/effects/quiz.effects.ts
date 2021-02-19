import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ITest } from 'src/app/models/test';
import { ITesting } from 'src/app/models/testing';
import { TestService } from 'src/app/services/test.service';
import { TestingService } from 'src/app/services/testing.service';
import { QuizActions } from '../actions/quiz.actions';
import { IAppState } from '../state/app.state';

@Injectable()
export class QuizEffects {
  getQuiz$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(QuizActions.GetQuiz),
      mergeMap((action) =>
        this.testService.getQuiz(action.testId).pipe(
          map((test: ITest) => QuizActions.GetQuizSuccess({ test })),
          catchError((error) => EMPTY)
        )
      )
    )
  );

  getTesting$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(QuizActions.GetTesting),
      mergeMap((action) =>
        this.testingService.getTesting(action.testingId).pipe(
          map((testing: ITesting) =>
            QuizActions.GetTestingSuccess({ testing })
          ),
          catchError((error) => EMPTY)
        )
      )
    )
  );

  getQuizById$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(QuizActions.GetQuizByTestingId),
      mergeMap((action) =>
        this.testingService.getTesting(action.testingId).pipe(
          mergeMap((testing: ITesting) => {
            this.store.dispatch(QuizActions.GetTestingSuccess({ testing }));
            return this.testService.getQuiz(testing.testId).pipe(
              map((test: ITest) => QuizActions.GetQuizSuccess({ test })),
              catchError((error) => EMPTY)
            );
          }),
          catchError((error) => EMPTY)
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private testService: TestService,
    private testingService: TestingService,
    private store: Store<IAppState>
  ) {}
}
