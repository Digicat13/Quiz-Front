import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { IUser } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  user: IUser;

  constructor(
    private router: Router,
    public authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe((u) => (this.user = u));
  }

  ngOnInit(): void {}

  logout(): void {
    this.authenticationService.logout();
  }
}
