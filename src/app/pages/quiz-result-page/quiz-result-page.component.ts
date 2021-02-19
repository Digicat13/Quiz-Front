import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { mergeMap } from 'rxjs/operators';
import { ITesting } from 'src/app/models/testing';
import { ITestingResult } from 'src/app/models/testingResult';
import { TestingService } from 'src/app/services/testing.service';
import { TestingResultService } from 'src/app/services/testingResult.service';

@Component({
  selector: 'app-quiz-result-page',
  templateUrl: './quiz-result-page.component.html',
  styleUrls: ['./quiz-result-page.component.scss'],
})
export class QuizResultPageComponent implements OnInit {
  testingResultId: string;
  testingResult: ITestingResult;
  testing: ITesting;
  constructor(
    private activatedRoute: ActivatedRoute,
    private testingResultService: TestingResultService,
    private testingService: TestingService,
    private router: Router
  ) {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.testingResultId = params.get('id');
    });
  }

  ngOnInit(): void {
    this.testingResultService
      .getTestingResult(this.testingResultId)
      .pipe(
        mergeMap((testingResult: ITestingResult) => {
          this.testingResult = testingResult;
          return this.testingService.getTesting(testingResult.testingId);
        })
      )
      .subscribe(
        (testing: ITesting) => {
          this.testing = testing;
        },
        (error) => {
          console.log('Failed to retrieve testing');
        }
      );
  }

  get attemptsAvailable(): boolean {
    if (this.testing?.numberOfRuns === 0) {
      return false;
    }
    return true;
  }

  goToQuizPage(): void {
    this.router.navigate([
      'quiz',
      this.testingResult?.testingId,
      this.testing?.intervieweeName,
    ]);
  }
}
