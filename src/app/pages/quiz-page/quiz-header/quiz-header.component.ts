import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { Moment } from 'moment';
import { Observable, Subscription } from 'rxjs';
import { QuizActions } from 'src/app/store/actions/quiz.actions';
import { IAppState } from 'src/app/store/state/app.state';
import * as lodash from 'lodash-es';
import { FormGroup } from '@angular/forms';
import { QuizSelectors } from 'src/app/store/selectors/quiz.selectors';

@Component({
  selector: 'app-quiz-header[testName]',
  templateUrl: './quiz-header.component.html',
  styleUrls: ['./quiz-header.component.scss'],
})
export class QuizHeaderComponent implements OnInit, OnDestroy {
  @Input() testName: string;
  @Input() testTimeLimit: Moment;
  @Input() questionTimeLimit: Moment;
  @Input() timeout: number;
  @Input() questionIndex: number;
  @Input() questionsCount: number;
  @Input() endQuizEvent: Observable<void>;
  @Input() nextQuestionEvent: Observable<void>;
  @Input() testForm: FormGroup;
  @Output() questionTimeLimitEnds = new EventEmitter();
  @Output() testTimeLimitEnds = new EventEmitter<number>();
  @Output() getQuizDuration = new EventEmitter<number>();
  timeLimitTimeout: NodeJS.Timeout;
  quizStopwatch: NodeJS.Timeout;
  public isTimeLimited = false;
  quizDuration = 0;
  private nextQuestionSubscription: Subscription;
  private endQuizSubscription: Subscription;

  constructor(private store: Store<IAppState>) {}

  ngOnInit(): void {
    this.store
      .select(QuizSelectors.selectTimeout)
      .subscribe((timeout: number) => {
        this.timeout = timeout;
        console.log(timeout);
      });

    this.store
      .select(QuizSelectors.selectQuizDuration)
      .subscribe((duration: number) => {
        this.quizDuration = duration;
        console.log(duration);
      });

    if (this.questionTimeLimit || this.testTimeLimit) {
      this.isTimeLimited = true;
    }

    this.nextQuestionSubscription = this.nextQuestionEvent.subscribe(() => {
      this.nextQuestion();
    });
    this.endQuizSubscription = this.endQuizEvent.subscribe(() => {
      this.stopQuizStopwatch();
      this.stopTimer();
      this.getQuizDuration.emit(this.quizDuration);
    });

    this.startQuizStopwatch();
    if (this.questionTimeLimit) {
      this.startTimerInit(this.timeout);
      // this.startTimer(this.questionTimeLimit);
    } else if (this.testTimeLimit) {
      this.startTimerInit(this.timeout);
      // this.startTimer(this.testTimeLimit);
    }
  }

  ngOnDestroy(): void {
    this.nextQuestionSubscription.unsubscribe();
    this.endQuizSubscription.unsubscribe();
  }

  nextQuestion(): void {
    if (this.questionIndex === this.questionsCount - 1) {
      this.stopTimer();
      this.stopQuizStopwatch();
      this.testTimeLimitEnds.emit(this.quizDuration);
    }
    if (this.questionTimeLimit) {
      this.stopTimer();
      this.startTimer(this.questionTimeLimit);
    }
  }

  timeLeft(): string {
    if (this.testTimeLimit) {
      return moment
        .utc(moment.duration({ milliseconds: this.timeout }).asMilliseconds())
        .format('HH:mm:ss');
    } else if (this.questionTimeLimit) {
      return moment
        .utc(moment.duration({ milliseconds: this.timeout }).asMilliseconds())
        .format('mm:ss');
    }
  }

  duration(): string {
    return moment
      .utc(moment.duration({ seconds: this.quizDuration }).asMilliseconds())
      .format('HH:mm:ss');
  }

  startTimer(time: Moment): void {
    const timeout = this.getMiliseconds(time);
    this.store.dispatch(QuizActions.ChangeTimeout({ timeout }));

    // this.timeout = timeout;
    // const timeout = this.timeout;
    this.timeLimitTimeout = setTimeout(() => this.onTimerEnd(), timeout);
  }

  startTimerInit(timeout: number): void {
    this.timeLimitTimeout = setTimeout(() => this.onTimerEnd(), timeout);
  }

  // startTimer(time: number): void {
  //   const timeout = this.getMiliseconds(time);
  //   // this.store.dispatch(QuizActions.ChangeTimeout({ timeout }));

  //   // this.timeout = timeout;
  //   // const timeout = this.timeout;
  //   this.timeLimitTimeout = setTimeout(() => this.onTimerEnd(), timeout);
  // }

  stopTimer(): void {
    clearTimeout(this.timeLimitTimeout);
  }

  getMiliseconds(timespan: Moment): number {
    // const timespan = moment(time);
    const hMiliseconds = timespan.hours() * 60 * 60 * 1000;
    const mMiliseconds = timespan.minutes() * 60 * 1000;
    const sMiliseconds = timespan.seconds() * 1000;
    return hMiliseconds + mMiliseconds + sMiliseconds;
  }

  startQuizStopwatch(): void {
    this.quizStopwatch = setInterval(() => {
      this.quizDuration++;
      if (this.timeout > 0) {
        this.timeout = this.timeout - 1000;
      }
      console.log('sec');

      console.log(this.testForm);

      // const clone = lodash.cloneDeep(this.timeout);
      // set timeout and duration into store

      this.store.dispatch(QuizActions.ChangeTimeout({ timeout: this.timeout }));
      this.store.dispatch(
        QuizActions.ChangeQuizDuration({ quizDuration: this.quizDuration })
      );
      this.store.dispatch(
        QuizActions.ChangeTestForm({ testFormValue: this.testForm.value })
      );
    }, 1000);
  }

  stopQuizStopwatch(): void {
    clearInterval(this.quizStopwatch);
  }

  onTimerEnd(): void {
    if (this.questionIndex === this.questionsCount - 1) {
      this.stopTimer();
      this.stopQuizStopwatch();
      this.testTimeLimitEnds.emit(this.quizDuration);
    }
    if (this.questionTimeLimit) {
      this.questionTimeLimitEnds.emit();
      this.stopTimer();
      this.startTimer(this.questionTimeLimit);
    } else if (this.testTimeLimit) {
      this.stopQuizStopwatch();
      this.stopTimer();
      this.testTimeLimitEnds.emit(this.quizDuration);
    }
  }
}
