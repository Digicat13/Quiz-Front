import { initialTestState, ITestState } from './test.state';

export interface IAppState {
  testState: ITestState;
}

export const initialAppState: IAppState = {
  testState: initialTestState,
};

export function getInitialState(): IAppState {
  return initialAppState;
}
