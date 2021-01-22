import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUser } from '../models/user';
import { AccountControllerService } from './api.controller.services/account.controller.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<IUser>;
  public currentUser: Observable<IUser>;
  private refreshTokenTimeout: NodeJS.Timeout;

  constructor(
    private router: Router,
    private accountControllerService: AccountControllerService
  ) {
    this.currentUserSubject = new BehaviorSubject<IUser>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): IUser {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string): Observable<IUser> {
    return this.accountControllerService.signin({ username, password }).pipe(
      map((user: IUser) => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        this.startRefreshTokenTimer();
        return user;
      })
    );
  }

  refreshToken(): Observable<IUser> {
    return this.accountControllerService.refresh({}).pipe(
      map((user: IUser) => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        this.startRefreshTokenTimer();
        return user;
      })
    );
  }

  logout(): void {
    this.accountControllerService.signout({}).subscribe();
    localStorage.removeItem('currentUser');
    this.stopRefreshTokenTimer();
    this.currentUserSubject.next(null);
    this.router.navigate(['/login-page']);
  }

  private startRefreshTokenTimer(): void {
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

  private stopRefreshTokenTimer(): void {
    clearTimeout(this.refreshTokenTimeout);
  }
}
