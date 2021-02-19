import { Component, OnInit } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { SortingProperty } from 'src/app/components/sorting-chip-list/sorting-chip-list.component';
import { testingProperties } from 'src/app/constants/sorting/testing-properties';
import { PagedList } from 'src/app/models/PagedList';
import { ITesting } from 'src/app/models/testing';
import { TestingService } from 'src/app/services/testing.service';

@Component({
  selector: 'app-view-testing-page',
  templateUrl: './view-testing-page.component.html',
  styleUrls: ['./view-testing-page.component.scss'],
})
export class ViewTestingPageComponent implements OnInit {
  testingId: string;
  testings = new PagedList<ITesting>([]);
  paginatorProperties = {
    totalCount: 0,
    pageSize: 5,
    pageSizeOptions: PagedList.pageSizeOptions,
    currentPage: 1,
  };
  sortingProperties: SortingProperty[] = testingProperties;

  constructor(
    private activatedRoute: ActivatedRoute,
    private testingService: TestingService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.testingId = params.get('id');
      if (!this.testingId) {
        this.getTestings(
          this.paginatorProperties.currentPage,
          this.paginatorProperties.pageSize
        );
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

  getTestings(
    pageNumber: number,
    pageSize: number,
    orderBy?: SortingProperty
  ): void {
    this.testingService.getAll(pageNumber, pageSize, orderBy).subscribe(
      (testings: PagedList<ITesting>) => {
        this.testings = testings;
        this.setPaginatorProperties(testings);
      },
      (error) => {}
    );
  }

  setPaginatorProperties(pl: PagedList<any>): void {
    this.paginatorProperties.totalCount = pl.totalCount;
    this.paginatorProperties.pageSize = pl.pageSize;
    this.paginatorProperties.currentPage = pl.currentPage;
  }

  paginatorChanges(pageEvent: PageEvent, matPaginator: MatPaginator): void {
    this.testings.pageEvent = pageEvent;
    this.getTestings(this.testings.currentPage, this.testings.pageSize);
  }

  onPropertySelect(selectedProperty: SortingProperty): void {
    this.getTestings(
      this.testings.currentPage,
      this.testings.pageSize,
      selectedProperty
    );
  }
}
