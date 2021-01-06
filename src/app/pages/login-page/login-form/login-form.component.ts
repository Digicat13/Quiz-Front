import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { IUser } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  returnUrl: string;
  error: { message: string; status: number };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  loginForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
  });

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  get form(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.authenticationService
      .login(this.form.username.value, this.form.password.value)
      .pipe(first())
      .subscribe(
        (user: IUser) => {
          this.router.navigate([this.returnUrl]);
        },
        (error) => {
          if (error.status === 401) {
            this.error = error;
          }
        }
      );
  }

  closeError(): void {
    this.error = undefined;
  }
}
