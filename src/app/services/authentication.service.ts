import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { IUser } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<IUser>;
  public currentUser: Observable<IUser>;
  private refreshTokenTimeout;

  constructor(private router: Router, private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<IUser>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): IUser {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string): Observable<IUser> {
    return this.http
      .post(`${environment.apiUrl}/account/signin`, { username, password })
      .pipe(
        map((user: IUser) => {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          this.startRefreshTokenTimer();
          return user;
        })
      );
  }

  refreshToken(): Observable<IUser> {
    return this.http
      .post(
        `${environment.apiUrl}/account/refresh`,
        {}
      )
      .pipe(
        map((user: IUser) => {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          this.startRefreshTokenTimer();
          return user;
        })
      );
  }

  logout(): void {
    this.http
      .post<any>(
        `${environment.apiUrl}/account/signout`,
        {}
      )
      .subscribe();
    localStorage.removeItem('currentUser');
    this.stopRefreshTokenTimer();
    this.currentUserSubject.next(null);
    this.router.navigate(['/login-page']);
  }

  private startRefreshTokenTimer() {
    const jwtToken = JSON.parse(
      atob(this.currentUserValue.token.split('.')[1])
    );
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - 60 * 1000;
    this.refreshTokenTimeout = setTimeout(
      () => this.refreshToken().subscribe(),
      timeout
    );
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }
}
