import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ITesting } from 'src/app/models/testing';
import { TestingService } from 'src/app/services/testing.service';

@Component({
  selector: 'app-view-testing-page',
  templateUrl: './view-testing-page.component.html',
  styleUrls: ['./view-testing-page.component.scss'],
})
export class ViewTestingPageComponent implements OnInit {
  testingId: string;
  testings: ITesting[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private testingService: TestingService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.testingId = params.get('id');
      if (!this.testingId) {
        this.getTestings();
      } else {
        this.getTesting(this.testingId);
      }
    });
  }

  getTesting(id: string): void {
    this.testingService.getTesting(id).subscribe(
      (testing: ITesting) => {
        this.testings.push(testing);
      },
      (error) => {}
    );
  }

  getTestings(): void {
    this.testingService.getAll().subscribe(
      (testings: ITesting[]) => {
        this.testings = testings;
      },
      (error) => {}
    );
  }
}
