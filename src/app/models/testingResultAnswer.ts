import { IAnswer } from "./answer";
import { IQuestion } from "./question";

export interface ITestingResultAnswer {
  id?: string;
  testingResultId?: string;
  testQuestionId?: string;
  testAnswerId?: string;
  testAnswer?: IAnswer;
  testQuestion?: IQuestion;
}
