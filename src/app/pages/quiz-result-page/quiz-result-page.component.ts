import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ITestingResult } from 'src/app/models/testingResult';
import { TestingResultService } from 'src/app/services/testingResult.service';

@Component({
  selector: 'app-quiz-result-page',
  templateUrl: './quiz-result-page.component.html',
  styleUrls: ['./quiz-result-page.component.scss'],
})
export class QuizResultPageComponent implements OnInit {
  testingResultId: string;
  testingResult: ITestingResult;
  constructor(
    private activatedRoute: ActivatedRoute,
    private testingResultService: TestingResultService,
    private router: Router
  ) {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.testingResultId = params.get('id');
    });
  }

  async ngOnInit(): Promise<void> {
    await this.testingResultService
      .getTestingResult(this.testingResultId)
      .subscribe((result: ITestingResult) => {
        this.testingResult = result;
      });
  }

  goToQuizPage(): void {
    this.router.navigate(['quiz', this.testingResult?.testingId]);
  }
}
