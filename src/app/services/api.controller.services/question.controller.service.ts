import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root',
})
export class QuestionControllerService {
  controller = 'question';

  constructor(private apiService: ApiService) {}

  delete(id: string): Observable<any> {
    return this.apiService.delete(this.controller, id);
  }
}
