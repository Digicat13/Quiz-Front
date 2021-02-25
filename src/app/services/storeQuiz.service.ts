import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { filter, map } from 'rxjs/operators';
import { ITest } from '../models/test';
import { ITesting } from '../models/testing';
import { QuizSelectors } from '../store/selectors/quiz.selectors';
import { IAppState } from '../store/state/app.state';
import * as lodash from 'lodash-es';
import * as moment from 'moment';
import { QuizActions } from '../store/actions/quiz.actions';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoreQuizService {
  private test$: Observable<ITest>;
  private testing$: Observable<ITesting>;
  private formValue$: Observable<any>;
  private currentQuestionIndex$: Observable<number>;
  private testingStartDateTime$: Observable<Date>;
  private timeout$: Observable<number>;
  private duration$: Observable<number>;
  isStarted: boolean;

  constructor(private store: Store<IAppState>) {
    this.selectTesting();
    this.selectQuiz();
    this.getIsQuizStarted().subscribe((isStarted: boolean) => {
      this.isStarted = isStarted;
    });
    this.selectQuizDate();
    this.selectTestValue();
    this.selectDuration();
    this.selectQuestionIndex();
    this.selectTimeout();
  }

  getIsQuizStarted(): Observable<boolean> {
    return this.store.select(QuizSelectors.selectIsStarted);
  }

  getStartDate(): Observable<Date> {
    return this.testingStartDateTime$;
  }

  getCurrentQuestionIndex(): Observable<number> {
    return this.currentQuestionIndex$;
  }

  getTimeout(): Observable<number> {
    return this.timeout$;
  }

  getFormValue(): Observable<any> {
    return this.formValue$;
  }

  getDuration(): Observable<number> {
    return this.duration$;
  }

  getQuiz(testingId: string): Observable<ITest> {
    if (this.isStarted === false) {
      this.store.dispatch(QuizActions.GetQuizByTestingId({ testingId }));
      this.selectQuiz();
    }
    return this.test$;
  }

  getTesting(testingId: string): Observable<ITesting> {
    if (this.isStarted === false) {
      this.store.dispatch(QuizActions.GetTesting({ testingId }));
      this.selectTesting();
    }
    return this.testing$;
  }

  setStartDate(date: Date): void {
    this.store.dispatch(
      QuizActions.ChangeQuizDate({ testingStartDateTime: date })
    );
  }

  setTimeout(timeout: number): void {
    this.store.dispatch(QuizActions.ChangeTimeout({ timeout }));
  }

  setDuration(duration: number): void {
    this.store.dispatch(
      QuizActions.ChangeQuizDuration({ quizDuration: duration })
    );
  }

  setTestFormValue(formValue: any): void {
    this.store.dispatch(
      QuizActions.ChangeTestForm({ testFormValue: formValue })
    );
  }

  setIsQuizStarted(isStarted: boolean): void {
    this.isStarted = isStarted;
    this.store.dispatch(QuizActions.ChangeQuizStatus({ isStarted }));
  }

  setCurrentQuestionIndex(index: number): void {
    this.store.dispatch(
      QuizActions.ChangeCurrentQuestionIndex({ questionIndex: index })
    );
  }

  selectQuiz(): void {
    this.test$ = this.store
      .pipe(
        select(QuizSelectors.selectQuiz),
        filter((val: ITest) => val !== null)
      )
      .pipe(
        map((testStore: ITesting) => {
          const test = lodash.cloneDeep(testStore);
          if (test.questionTimeLimit) {
            test.questionTimeLimit = moment(test.questionTimeLimit, 'HH:mm:ss');
          } else if (test.testTimeLimit) {
            test.testTimeLimit = moment(test.testTimeLimit, 'HH:mm:ss');
          }
          return test;
        })
      );
  }

  selectQuizDate(): void {
    this.testingStartDateTime$ = this.store.pipe(
      select(QuizSelectors.selectDate),
      filter((val: Date) => val !== null)
    );
  }

  selectTesting(): void {
    this.testing$ = this.store
      .pipe(
        select(QuizSelectors.selectTesting),
        filter((val: ITesting) => val !== null)
      )
      .pipe(
        map((testingStore: ITesting) => {
          const testing = lodash.cloneDeep(testingStore);
          return testing;
        })
      );
  }

  selectQuestionIndex(): void {
    this.currentQuestionIndex$ = this.store.pipe(
      select(QuizSelectors.selectCurrentQuestionIndex),
      filter((val: number) => val !== null)
    );
  }

  selectTestValue(): void {
    this.formValue$ = this.store.pipe(
      select(QuizSelectors.selectTestForm),
      filter((val: any) => val !== null)
    );
  }

  selectTimeout(): void {
    this.timeout$ = this.store.pipe(
      select(QuizSelectors.selectTimeout),
      filter((val: number) => val !== null)
    );
  }

  selectDuration(): void {
    this.duration$ = this.store.pipe(
      select(QuizSelectors.selectQuizDuration),
      filter((val: number) => val !== null)
    );
  }

  clearQuizData(): void {
    this.store.dispatch(QuizActions.ClearQuizState());
  }
}
