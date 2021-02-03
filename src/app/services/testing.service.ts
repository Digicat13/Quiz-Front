import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PagedList } from '../models/PagedList';
import { ITesting } from '../models/testing';
import { TestingControllerService } from './api.controller.services/testing.controller.service';

@Injectable({
  providedIn: 'root',
})
export class TestingService {
  constructor(private testingControllerService: TestingControllerService) {}

  getAll(pageNumber: number, pageSize: number): Observable<PagedList<ITesting>> {
    return this.testingControllerService.get(pageNumber, pageSize).pipe(
      map((data: HttpResponse<ITesting[]>) => {
        const paginationHeader = data.headers.get('X-Pagination');
        const testings = data.body;
        const pl = new PagedList<ITesting>([]);
        return pl.fromString(testings, paginationHeader);
      })
    );
  }

  getTesting(id: string): Observable<ITesting> {
    return this.testingControllerService.getById(id);
  }

  createTesting(testing: ITesting): Observable<ITesting> {
    return this.testingControllerService.post(testing);
  }

  getTestingUrl(testingId: string): string {
    return `${environment.clientUrl}/quiz/${testingId}`;
  }
}
