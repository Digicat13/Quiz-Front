import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ITesting } from '../models/testing';
import { TestingControllerService } from './api.controller.services/testing.controller.service';

@Injectable({
  providedIn: 'root',
})
export class TestingService {
  constructor(private testingControllerService: TestingControllerService) {}

  getAll(): Observable<ITesting[]> {
    return this.testingControllerService.get();
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
