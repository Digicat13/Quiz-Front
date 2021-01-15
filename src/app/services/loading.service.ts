import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loadingStatusSource = new BehaviorSubject<boolean>(false);
  public loadingStatus = this.loadingStatusSource.asObservable();

  constructor() {}

  show(): void {
    this.loadingStatusSource.next(true);
  }

  hide(): void {
    this.loadingStatusSource.next(false);
  }
}
