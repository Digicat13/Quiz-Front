import { createSelector } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { IQuizState } from '../state/quiz.state';

export const selectQuiz = createSelector(
  (state: IAppState) => state.quizState,
  (quizState: IQuizState) => {
      return quizState.test;
  }
);

export const selectTesting = createSelector(
    (state: IAppState) => state.quizState,
    (quizState: IQuizState) => {
        return quizState.testing;
    }
  );
