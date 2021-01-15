import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ITest } from 'src/app/models/test';
import { ITesting } from 'src/app/models/testing';
import { TestService } from 'src/app/services/test.service';
import { TestingService } from 'src/app/services/testing.service';

@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.scss'],
})
export class QuizPageComponent implements OnInit {
  testingId: string;
  testing: ITesting;
  test: ITest;

  constructor(
    private activatedRoute: ActivatedRoute,
    private testService: TestService,
    private testingService: TestingService
  ) {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.testingId = params.get('id');
    });
  }

  async ngOnInit(): Promise<void> {
    await this.getTesting(this.testingId);
    this.getTest(this.testing.testId);
  }

  async getTesting(testingId: string): Promise<void> {
    await this.testingService
      .getTesting(testingId)
      .toPromise()
      .then(
        (testing: ITesting) => {
          this.testing = testing;
        },
        (error) => {
          console.log('Failed to retrieve test');
        }
      );
  }

  getTest(testId: string): void {
    this.testService.getTest(testId).subscribe(
      (test: ITest) => {
        this.test = test;
        console.log(test);
      },
      (error) => {
        console.log('Failed to retrieve test');
      }
    );
  }
}
