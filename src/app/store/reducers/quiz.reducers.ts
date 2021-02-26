import { createReducer, on } from '@ngrx/store';
import { QuizActions } from '../actions/quiz.actions';
import { initialQuizState } from '../state/quiz.state';

export const quizReducer = createReducer(
  initialQuizState,
  on(QuizActions.GetQuizSuccess, (state, action) => ({
    ...state,
    test: action.test,
  })),
  on(QuizActions.GetTestingSuccess, (state, action) => ({
    ...state,
    testing: action.testing,
  })),
  on(QuizActions.ChangeCurrentQuestionIndex, (state, action) => ({
    ...state,
    currentQuestionIndex: action.questionIndex,
  })),
  on(QuizActions.ChangeQuizStatus, (state, action) => ({
    ...state,
    isStarted: action.isStarted,
  })),
  on(QuizActions.ChangeQuizDate, (state, action) => ({
    ...state,
    testingStartDateTime: action.testingStartDateTime,
  })),
  on(QuizActions.ChangeQuizDuration, (state, action) => ({
    ...state,
    quizDuration: action.quizDuration,
  })),
  on(QuizActions.ChangeTimeout, (state, action) => ({
    ...state,
    timeout: action.timeout,
  })),
  on(QuizActions.ChangeTestForm, (state, action) => ({
    ...state,
    testFormValue: action.testFormValue,
  })),
  on(QuizActions.ClearQuizState, () => ({
    ...initialQuizState,
  }))
);
