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
  }))
);
