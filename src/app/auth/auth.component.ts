import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { AuthService, AuthResponseData } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService, private router: Router) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }

    if(this.isLoginMode) {
      this.authService.login(email, password).subscribe(
        resData => {
          console.log(resData);
          this.isLoading = false;
          this.router.navigate(['/bookFlight'])
        }, errorRes => {
          console.log(errorRes)
          switch(errorRes.error.error.message) {
           case 'INVALID_LOGIN_CREDENTIALS': this.error = 'Please enter valid credentials'; break;
          }
          this.isLoading = false;
        }
      )
    } else {
      this.authService.signup(email, password).subscribe(
        resData => {
          console.log(resData);
          this.isLoading = false;
          this.router.navigate(['/bookFlight'])
        }, errorRes => {
          console.log(errorRes)
          switch(errorRes.error.error.message) {
           case 'EMAIL_EXISTS': this.error = 'The email address is already in use by another account'; break;
          }
          this.isLoading = false;
        }
      )
    }

    form.reset();
  }
}
