import { identifierModuleUrl } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  @Output() loading = new EventEmitter<boolean>();
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

    this.loading.emit(true);
    this.authenticationService
      .login(this.form.username.value, this.form.password.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.loading.emit(false);
          this.router.navigate([this.returnUrl]);
        },
        error: (error) => {
          {
            this.loading.emit(false);
            this.error = error;
          }
        },
      });
  }

  closeError(): void {
    this.error = undefined;
  }
}
