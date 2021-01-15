import { Component, Input } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import * as moment from 'moment';
import { ITest } from 'src/app/models/test';
import { ITesting } from 'src/app/models/testing';

@Component({
  selector: 'app-test-info',
  templateUrl: './test-info.component.html',
  styleUrls: ['./test-info.component.scss'],
})
export class TestInfoComponent {
  testingId: string;
  @Input() testing: ITesting;
  @Input() test: ITest;

  constructor(
    private activatedRoute: ActivatedRoute,
  ) {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.testingId = params.get('id');
    });
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

  onPressStart() {}
}
