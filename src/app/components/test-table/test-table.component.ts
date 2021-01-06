import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ITest } from 'src/app/models/test';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-test-table',
  templateUrl: './test-table.component.html',
  styleUrls: ['./test-table.component.scss'],
})
export class TestTableComponent implements OnInit {
  constructor(private testService: TestService, private router: Router) {}
  tests: Array<ITest> = [];

  ngOnInit(): void {
    this.getTests();
  }

  getTests(): void {
    this.testService.getAll().subscribe((data: ITest[]) => {
      this.tests = data;
    });
  }
}
