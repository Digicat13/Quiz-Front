import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ITest } from '../models/test';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<ITest[]> {
    return this.http.get<ITest[]>(`${environment.apiUrl}/test`);
  }

  createTest(test: ITest): Observable<ITest> {
    return this.http.post(`${environment.apiUrl}/test`, test);
  }
}
