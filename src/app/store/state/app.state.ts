import { initialQuizState, IQuizState } from './quiz.state';
import { initialTestState, ITestState } from './test.state';

export interface IAppState {
  testState: ITestState;
  quizState: IQuizState;
}

export const initialAppState: IAppState = {
  testState: initialTestState,
  quizState: initialQuizState
};

export function getInitialState(): IAppState {
  return initialAppState;
}
