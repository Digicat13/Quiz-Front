import { Moment } from 'moment';
import { IQuestion } from './question';

export interface ITest {
  id?: string;
  name?: string;
  description?: string;
  testTimeLimit?: Moment;
  questionTimeLimit?: Moment;
  questions?: Array<IQuestion>;
}
