import { Time } from '@angular/common';
import { IQuestion } from './question';
import { ITime } from './time';

export interface ITest {
    id?: string;
    name: string;
    description: string;
    testTimeLimit: Time;
    questionTimeLimit: ITime;
    questions: Array<IQuestion>;
}
