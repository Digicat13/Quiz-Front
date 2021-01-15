import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root',
})
export class TestControllerService {
  controller = 'test';

  constructor(private apiService: ApiService) {}

  get(): Observable<any> {
    return this.apiService.get(this.controller);
  }

  post(model: any): Observable<any> {
    return this.apiService.post(this.controller, model);
  }

  getById(id: string): Observable<any> {
    return this.apiService.getById(this.controller, id);
  }

  delete(id: string): Observable<any> {
    return this.apiService.delete(this.controller, id);
  }

  put(model: any): Observable<any> {
    return this.apiService.put(this.controller, model);
  }
}
