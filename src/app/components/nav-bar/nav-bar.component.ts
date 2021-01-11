import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  constructor(
    private router: Router,
    private authenticatinService: AuthenticationService
  ) {}

  ngOnInit(): void {}

  logout(): void {
    this.authenticatinService.logout();
    this.router.navigate(['/login-page']);
  }
}
