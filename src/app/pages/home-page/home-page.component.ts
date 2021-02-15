import { Component, OnInit } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { select, Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { SortingProperty } from 'src/app/components/sorting-chip-list/sorting-chip-list.component';
import { testProperties } from 'src/app/constants/sorting/test-properties';
import { PagedList } from 'src/app/models/PagedList';
import { ITest } from 'src/app/models/test';
import { TestActions } from 'src/app/store/actions/test.actions';
import { selectTests } from 'src/app/store/selectors/test.selectors';
import { IAppState } from 'src/app/store/state/app.state';

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
  constructor(private store: Store<IAppState>) {}

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
    this.store.dispatch(
      TestActions.GetTests({
        pageNumber,
        pageSize,
        orderBy,
      })
    );

    this.store
      .pipe(
        select(selectTests),
        filter((val) => val !== null)
      )
      .subscribe((tests: PagedList<ITest>) => {
        this.tests = tests;
        this.setPaginatorProperties(this.tests);
      });
  }

  setPaginatorProperties(pl: PagedList<any>): void {
    this.paginatorProperties.totalCount = pl.totalCount;
    this.paginatorProperties.pageSize = pl.pageSize;
    this.paginatorProperties.currentPage = pl.currentPage;
  }

  paginatorChanges(pageEvent: PageEvent, matPaginator: MatPaginator): void {
    const data = new PagedList(
      this.tests,
      this.tests.totalCount,
      this.tests.currentPage,
      this.tests.pageSize,
      this.tests.totalPages
    );
    data.pageEvent = pageEvent;
    this.store.dispatch(TestActions.GetTestsSuccess({ tests: data }));

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
