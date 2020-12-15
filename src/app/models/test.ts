import { Time } from '@angular/common';
import { IQuestion } from './question';

export interface ITest {
    id?: string;
    name: string;
    description: string;
    testTimeLimit: Time;
    questionTimeLimit: Time;
    questions: Array<IQuestion>;
}
