import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITesting } from '../models/testing';
import { TestingResultControllerService } from './api.controller.services/testingResult.controller.service';

@Injectable({
  providedIn: 'root',
})
export class TestingResultService {
  constructor(
    private testingResultControllerService: TestingResultControllerService
  ) {}

  getAll(): Observable<ITesting[]> {
    return this.testingResultControllerService.get();
  }

  getTestingResult(id: string): Observable<ITesting> {
    return this.testingResultControllerService.getById(id);
  }

  createTestingResult(testing: ITesting): Observable<ITesting> {
    return this.testingResultControllerService.post(testing);
  }
}
