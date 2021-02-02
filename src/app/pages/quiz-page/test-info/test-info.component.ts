import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import * as moment from 'moment';
import { ITest } from 'src/app/models/test';
import { ITesting } from 'src/app/models/testing';

@Component({
  selector: 'app-test-info',
  templateUrl: './test-info.component.html',
  styleUrls: ['./test-info.component.scss'],
})
export class TestInfoComponent implements OnInit {
  testingId: string;
  @Input() testing: ITesting;
  @Input() test: ITest;
  @Output() pressStart = new EventEmitter();
  submitted = false;

  intervieweeInput = new FormControl(null);

  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.testingId = params.get('id');
    });
  }

  ngOnInit(): void {
    if (!this.testing?.intervieweeName) {
      this.setIntervieweeValidators();
    }
  }

  setIntervieweeValidators(): void {
    this.intervieweeInput.setValidators([Validators.required]);
  }

  numberOfRuns(): string {
    return this.testing?.numberOfRuns?.toString() ?? 'Unlimited';
  }

  allowedStartDate(): string {
    if (this.testing?.allowedStartDate) {
      const date = moment(this.testing?.allowedStartDate);
      return date.format('D/MM/YYYY, h:mm:ss a');
    }
    return '-';
  }

  allowedEndDate(): string {
    if (this.testing?.allowedEndDate) {
      const date = moment(this.testing?.allowedEndDate);
      return date.format('D/MM/YYYY, h:mm:ss a');
    }
    return '-';
  }

  testTimeLimit(): string {
    return (
      this.test?.testTimeLimit?.hours() +
      'h' +
      ' ' +
      this.test?.testTimeLimit?.minutes() +
      'm'
    );
  }

  questionTimeLimit(): string {
    return (
      this.test?.questionTimeLimit?.minutes() +
      'm' +
      ' ' +
      this.test?.questionTimeLimit?.seconds() +
      's'
    );
  }

  onPressStart(): void {
    this.submitted = true;
    if (!this.testing.intervieweeName && this.intervieweeInput.invalid) {
      return;
    }
    if (!this.testing.intervieweeName) {
      const interviewee: string = this.intervieweeInput.value;
      this.testing.intervieweeName = interviewee;
    }
    this.pressStart.emit(this.testing.intervieweeName);
  }
}
