import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ITest } from 'src/app/models/test';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-view-test-page',
  templateUrl: './view-test-page.component.html',
  styleUrls: ['./view-test-page.component.scss'],
})
export class ViewTestPageComponent implements OnInit {
  @Input() test: ITest;
  @Input() testId: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private testService: TestService
  ) {}

  ngOnInit(): void {
    if (!this.testId) {
      this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
        this.testId = params.get('id');
      });
    }
    this.testService.getTest(this.testId).subscribe(
      (test: ITest) => {
        this.test = test;
      },
      (error) => {
        console.log('Failed to retrieve test');
      }
    );
  }
}
