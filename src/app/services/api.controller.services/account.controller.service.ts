import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root',
})
export class AccountControllerService {
  private controller = 'account';

  constructor(private apiService: ApiService) {}

  signin(model: any): Observable<any> {
    const method = 'signin';
    return this.apiService.post(this.controller + '/' + method, model);
  }

  refresh(model: any): Observable<any> {
    const method = 'refresh';
    return this.apiService.post(this.controller + '/' + method, model);
  }

  signout(model: any): Observable<any> {
    const method = 'signout';
    return this.apiService.post(this.controller + '/' + method, model);
  }
}
