import { IAnswer } from './answer';

export interface IQuestion {
    id?: string;
    testId?: string;
    questionText: string;
    hintText?: string;
    answers: Array<IAnswer>;
}
