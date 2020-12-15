import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ITest } from '../models/test';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  constructor(private http: HttpClient) {}

  apiUrl: string = environment.apiUrl + '/test';

  getAll(): Observable<ITest[]> {
    return this.http.get<ITest[]>(this.apiUrl);
  }
}
