import { PageEvent } from '@angular/material/paginator';

export class PagedList<T> extends Array<T> {
  public static pageSizeOptions: number[] = [5, 10, 20];
  public totalCount?: number;
  public pageSize?: number;
  public currentPage?: number;
  public totalPages?: number;
  private pEvent?: PageEvent;

  constructor(
    items: Array<T>,
    count?: number,
    pageNumber?: number,
    pageSize?: number,
    totalPages?: number
  ) {
    super(...items);
    Object.setPrototypeOf(this, PagedList.prototype);
    this.totalCount = count;
    this.pageSize = pageSize;
    this.currentPage = pageNumber;
    this.totalPages = totalPages;
  }

  public get hasNext(): boolean {
    return this.currentPage < this.totalPages;
  }
  public get hasPrevious(): boolean {
    return this.currentPage > 1;
  }

  public set pageEvent(pageEvent: PageEvent) {
    this.pEvent = pageEvent;
    this.currentPage = pageEvent.pageIndex + 1;
    this.pageSize = pageEvent.pageSize;
    this.totalCount = pageEvent.length;
  }

  public get pageEvent(): PageEvent {
    return this.pEvent;
  }

  public fromString(items: Array<T>, jsonProperties: string): PagedList<T> {
    const header = JSON.parse(jsonProperties);
    const pagination = {
      totalCount: header.TotalCount,
      pageSize: header.PageSize,
      currentPage: header.CurrentPage,
      totalPages: header.TotalPages,
    };
    const pl = new PagedList(
      items,
      pagination.totalCount,
      pagination.currentPage,
      pagination.pageSize,
      pagination.totalPages
    );

    return pl;
  }
}
