import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  isLoading = false;

  constructor() {}

  ngOnInit(): void {}

  onLoading(isLoading: boolean): void {
    this.isLoading = isLoading;
  }
}
