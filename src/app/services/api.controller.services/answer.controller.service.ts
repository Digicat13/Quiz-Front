import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root',
})
export class AnswerControllerService {
  controller = 'answer';

  constructor(private apiService: ApiService) {}

  delete(id: string): Observable<any> {
    return this.apiService.delete(this.controller, id);
  }
}
