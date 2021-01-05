import { Component } from '@angular/core';
import * as moment from 'moment';
import { IUser } from './models/user';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Quizzer';
  currentUser: IUser;

  constructor(private authenticatinService: AuthenticationService) {
    this.authenticatinService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
    moment.fn.toJSON = function(): any {
      return this.format('HH:mm:ss');
    };
  }
}
