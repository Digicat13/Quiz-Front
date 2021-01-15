import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root',
})
export class TestingControllerService {
  private controller = 'testing';

  constructor(private apiService: ApiService) {}

  get(): Observable<any> {
    return this.apiService.get(this.controller);
  }

  getById(id: string): Observable<any> {
    return this.apiService.getById(this.controller, id);
  }

  post(model: any): Observable<any> {
    return this.apiService.post(this.controller, model);
  }
}
