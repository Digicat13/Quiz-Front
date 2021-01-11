import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ITest } from 'src/app/models/test';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-create-testing-page',
  templateUrl: './create-testing-page.component.html',
  styleUrls: ['./create-testing-page.component.scss'],
})
export class CreateTestingPageComponent implements OnInit {
  testName: string;
  testId: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private testService: TestService
  ) {}

  ngOnInit(): void {
    if (!this.testId) {
      this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
        this.testId = params.get('testId');
      });
    }

    this.getTestName(this.testId);
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
}
