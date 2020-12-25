import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  constructor() {}

  LoginForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
  });

  ngOnInit(): void {}

  onSubmit(): void {}
}
