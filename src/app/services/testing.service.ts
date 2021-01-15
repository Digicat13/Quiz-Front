import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ITesting } from '../models/testing';

@Injectable({
  providedIn: 'root',
})
export class TestingService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<ITesting[]> {
    return this.http.get<ITesting[]>(`${environment.apiUrl}/testing`);
  }

  getTesting(id: string): Observable<ITesting> {
    return this.http.get<ITesting>(`${environment.apiUrl}/testing/${id}`);
  }

  createTesting(testing: ITesting): Observable<ITesting> {
    return this.http.post(`${environment.apiUrl}/testing`, testing);
  }

  getTestingUrl(testingId: string): string {
    return `${environment.apiUrl}/quizz/${testingId}`;
  }
}
