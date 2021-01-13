import { Component } from '@angular/core';
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
      (user: IUser) => (this.currentUser = user)
    );
  }
}
