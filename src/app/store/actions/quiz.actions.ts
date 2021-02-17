import { createAction, props } from '@ngrx/store';
import { ITest } from 'src/app/models/test';
import { ITesting } from 'src/app/models/testing';

export enum EQuizActions {
  GetQuizByTestingId = '[Quiz] Get Quiz By TestingID',
  GetQuiz = '[Quiz] Get Quiz',
  GetQuizSuccess = '[Quiz] Get Quiz Success',
  GetTesting = '[Quiz] Get Testing',
  GetTestingSuccess = '[Quiz] Get Testing Success',
}

export class QuizActions {
  static GetQuiz = createAction(
    EQuizActions.GetQuiz,
    props<{ testId: string }>()
  );

  static GetQuizByTestingId = createAction(
    EQuizActions.GetQuizByTestingId,
    props<{ testingId: string }>()
  );

  static GetQuizSuccess = createAction(
    EQuizActions.GetQuizSuccess,
    props<{ test: ITest }>()
  );

  static GetTesting = createAction(
    EQuizActions.GetTesting,
    props<{ testingId: string }>()
  );

  static GetTestingSuccess = createAction(
    EQuizActions.GetTestingSuccess,
    props<{ testing: ITesting }>()
  );

  constructor() {}
}
