import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ITest } from 'src/app/models/test';
import { ITesting } from 'src/app/models/testing';
import { TestService } from 'src/app/services/test.service';
import { TestingService } from 'src/app/services/testing.service';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.scss'],
})
export class TestingComponent implements OnInit {
  @Input() testing: ITesting;
  testName: string;
  testingUrl: string;

  constructor(
    private testService: TestService,
    private testingService: TestingService
  ) {}

  ngOnInit(): void {
    this.getTestName(this.testing.testId);
  }

  getTestName(testId): void {
    this.testService.getTest(testId).subscribe(
      (test: ITest) => {
        this.testName = test.name;
      },
      (error) => {
        console.log('Failed to retrieve test');
      }
    );
  }

  getTestingUrl(): string {
    return this.testingService.getTestingUrl(this.testing.id);
  }

  intervieweeName(): string {
    return this.testing?.intervieweeName ?? '-';
  }

  numberOfRuns(): string {
    return this.testing?.numberOfRuns?.toString();
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

  copyUrlToClipboard(inputUrl: HTMLInputElement): void {
    const testingUrl = this.getTestingUrl();
    inputUrl.value = testingUrl;
    inputUrl.type = 'text';
    inputUrl.select();
    document.execCommand('copy');
    inputUrl.type = 'hidden';
  }
}
