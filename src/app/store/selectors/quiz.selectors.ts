import { createSelector } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { IQuizState } from '../state/quiz.state';

export class QuizSelectors {
  static selectQuiz = createSelector(
    (state: IAppState) => state.quizState,
    (quizState: IQuizState) => {
      return quizState.test;
    }
  );

  static selectTesting = createSelector(
    (state: IAppState) => state.quizState,
    (quizState: IQuizState) => {
      return quizState.testing;
    }
  );

  static selectDate = createSelector(
    (state: IAppState) => state.quizState,
    (quizState: IQuizState) => {
      return quizState.testingStartDateTime;
    }
  );

  static selectIsStarted = createSelector(
    (state: IAppState) => state.quizState,
    (quizState: IQuizState) => {
      return quizState.isStarted;
    }
  );

  static selectCurrentQuestionIndex = createSelector(
    (state: IAppState) => state.quizState,
    (quizState: IQuizState) => {
      return quizState.currentQuestionIndex;
    }
  );

  static selectQuizDuration = createSelector(
    (state: IAppState) => state.quizState,
    (quizState: IQuizState) => {
      return quizState.quizDuration;
    }
  );

  static selectTimeout = createSelector(
    (state: IAppState) => state.quizState,
    (quizState: IQuizState) => {
      return quizState.timeout;
    }
  );

  static selectTestForm = createSelector(
    (state: IAppState) => state.quizState,
    (quizState: IQuizState) => {
      return quizState.testFormValue;
    }
  );
}
