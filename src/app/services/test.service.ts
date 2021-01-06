import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ITest } from '../models/test';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<ITest[]> {
    return this.http.get<ITest[]>(`${environment.apiUrl}/test`).pipe(
      map((data: ITest[]) => {
        const tests = data;
        tests.forEach((test) => {
          if (test.questionTimeLimit !== null) {
            test.questionTimeLimit = moment(test.questionTimeLimit, 'HH:mm:ss');
          }
          if (test.testTimeLimit !== null) {
            test.testTimeLimit = moment(test.testTimeLimit, 'HH:mm:ss');
          }
        });
        return tests;
      })
    );
  }

  createTest(test: ITest): Observable<ITest> {
    return this.http.post(`${environment.apiUrl}/test`, test);
  }

  getTest(id: string): Observable<ITest> {
    return this.http.get(`${environment.apiUrl}/test/${id}`).pipe(
      map((data: ITest) => {
        const test = data;
        if (test.questionTimeLimit !== null) {
          test.questionTimeLimit = moment(test.questionTimeLimit, 'HH:mm:ss');
        }
        if (test.testTimeLimit !== null) {
          test.testTimeLimit = moment(test.testTimeLimit, 'HH:mm:ss');
        }
        return test;
      })
    );
  }

  deleteTest(id: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/test/${id}`);
  }
}
