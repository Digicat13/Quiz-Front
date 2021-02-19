import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  get(
    controller: string,
    pageNumber?: number,
    pageSize?: number,
    orderBy?: string
  ): Observable<any> {
    return this.http.get(
      `${environment.apiUrl}/${controller}?` +
        (pageNumber ? `pageNumber=${pageNumber}` : '') +
        (pageSize ? `&pageSize=${pageSize}` : '') +
        (orderBy ? `&orderBy=${orderBy}` : ''),
      { observe: 'response' }
    );
  }

  getById(controller: string, id: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/${controller}/${id}`);
  }

  post(controller: string, model: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/${controller}`, model);
  }

  delete(controller: string, id: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/${controller}/${id}`);
  }

  put(controller: string, model: any): Observable<any> {
    return this.http.put(
      `${environment.apiUrl}/${controller}/${model.id}`,
      model
    );
  }
}
