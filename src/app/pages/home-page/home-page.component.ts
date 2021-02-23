import { Component, OnInit } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { SortingProperty } from 'src/app/components/sorting-chip-list/sorting-chip-list.component';
import { testProperties } from 'src/app/constants/sorting/test-properties';
import { PagedList } from 'src/app/models/PagedList';
import { ITest } from 'src/app/models/test';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  tests = new PagedList<ITest>([]);
  paginatorProperties = {
    totalCount: 0,
    pageSize: 5,
    pageSizeOptions: PagedList.pageSizeOptions,
    currentPage: 1,
  };
  sortingProperties: SortingProperty[] = testProperties;
  constructor(private testService: TestService) {}

  ngOnInit(): void {
    this.getTests(
      this.paginatorProperties.currentPage,
      this.paginatorProperties.pageSize
    );
  }

  getTests(
    pageNumber: number,
    pageSize: number,
    orderBy?: SortingProperty
  ): void {
    this.testService
      .getAll(pageNumber, pageSize, orderBy)
      .subscribe((data: PagedList<ITest>) => {
        this.tests = data;
        this.setPaginatorProperties(data);
      });
  }

  setPaginatorProperties(pl: PagedList<any>): void {
    this.paginatorProperties.totalCount = pl.totalCount;
    this.paginatorProperties.pageSize = pl.pageSize;
    this.paginatorProperties.currentPage = pl.currentPage;
  }

  paginatorChanges(pageEvent: PageEvent, matPaginator: MatPaginator): void {
    this.tests.pageEvent = pageEvent;
    this.getTests(this.tests.currentPage, this.tests.pageSize);
  }

  onPropertySelect(selectedProperty: SortingProperty): void {
    this.getTests(
      this.tests.currentPage,
      this.tests.pageSize,
      selectedProperty
    );
  }
}
