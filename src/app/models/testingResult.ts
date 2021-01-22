import { Moment } from 'moment';
import { ITestingResultAnswer } from './testingResultAnswer';

export interface ITestingResult {
  id?: string;
  testingId?: string;
  intervieweeName?: string;
  testingStartDateTime?: Date;
  testingEndDateTime?: Date;
  questionTried?: number;
  correctAnswers?: number;
  duration?: Moment;
  score?: number;
  selectedAnswers?: ITestingResultAnswer[];
}
