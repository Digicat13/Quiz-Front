import { PagedList } from 'src/app/models/PagedList';
import { ITest } from 'src/app/models/test';

export interface ITestState {
  tests?: PagedList<ITest>;
}

export const initialTestState = {
  tests: new PagedList<ITest>([]),
};
