import { createAction, props } from '@ngrx/store';
import { ITest } from 'src/app/models/test';
import { ITesting } from 'src/app/models/testing';

export enum EQuizActions {
  GetQuizByTestingId = '[Quiz] Get Quiz By TestingID',
  GetQuiz = '[Quiz] Get Quiz',
  GetQuizSuccess = '[Quiz] Get Quiz Success',
  GetTesting = '[Quiz] Get Testing',
  GetTestingSuccess = '[Quiz] Get Testing Success',
  ChangeCurrentQuestionIndex = '[Quiz] Change Current Question Index',
  ChangeQuizStatus = '[Quiz] Change Quiz Status',
  ChangeQuizDate = '[Quiz] Change Quiz Date',
  ChangeQuizDuration = '[Quiz] Change Quiz Duration',
  ChangeTimeout = '[Quiz] Change Timeout',
  ChangeTestForm = '[Quiz] Change TestForm',
  ClearQuizState = '[Quiz] Clear QuizState',
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

  static ChangeCurrentQuestionIndex = createAction(
    EQuizActions.ChangeCurrentQuestionIndex,
    props<{ questionIndex: number }>()
  );

  static ChangeQuizStatus = createAction(
    EQuizActions.ChangeQuizStatus,
    props<{ isStarted: boolean }>()
  );

  static ChangeQuizDate = createAction(
    EQuizActions.ChangeQuizDate,
    props<{ testingStartDateTime: Date }>()
  );

  static ChangeQuizDuration = createAction(
    EQuizActions.ChangeQuizDuration,
    props<{ quizDuration: number }>()
  );

  static ChangeTimeout = createAction(
    EQuizActions.ChangeTimeout,
    props<{ timeout: number }>()
  );

  static ChangeTestForm = createAction(
    EQuizActions.ChangeTestForm,
    props<{ testFormValue: any }>()
  );

  static ClearQuizState = createAction(EQuizActions.ClearQuizState);
  constructor() {}
}
