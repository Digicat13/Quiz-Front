import { AfterViewChecked, ChangeDetectorRef, Component } from '@angular/core';
import * as moment from 'moment';
import { IUser } from './models/user';
import { AuthenticationService } from './services/authentication.service';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewChecked {
  title = 'Quizzer';
  currentUser: IUser;
  isLoading: boolean;

  constructor(
    private authenticatinService: AuthenticationService,
    private loadingService: LoadingService,
    private cdr: ChangeDetectorRef
  ) {
    this.authenticatinService.currentUser.subscribe(
      (user: IUser) => (this.currentUser = user)
    );

    moment.fn.toJSON = function (): any {
      return this.format('HH:mm:ss');
    };
  }

  ngAfterViewChecked(): void {
    this.loadingService.loadingStatus.subscribe(
      (isLoading: boolean) => (this.isLoading = isLoading)
    );
    this.cdr.detectChanges();
  }
}
