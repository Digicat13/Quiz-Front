import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ITest } from 'src/app/models/test';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-view-test-page',
  templateUrl: './view-test-page.component.html',
  styleUrls: ['./view-test-page.component.scss'],
})
export class ViewTestPageComponent implements OnInit {
  test: ITest;
  constructor(
    private activatedRoute: ActivatedRoute,
    private testService: TestService
  ) {}

  ngOnInit(): void {
    let testId: string;
    this.activatedRoute.paramMap.subscribe((params) => {
      testId = params.get('id');
    });
    this.testService.getTest(testId).subscribe(
      (test) => {
        this.test = test;
      },
      (error) => {
        console.log('Failed to retrieve test');
      }
    );
  }
}
