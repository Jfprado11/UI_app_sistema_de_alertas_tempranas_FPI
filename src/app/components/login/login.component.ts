import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router
  ) {
    this.formLogin = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  logIn() {
    const username = this.formLogin.value.username;
    const password = this.formLogin.value.password;
    this.loading = true;

    this.authService.signIn({ username, password }).subscribe(
      (res: any) => {
        setTimeout(() => {
          localStorage.setItem('token', res.token);
          this.router.navigate(['dashboard']);
          this.loading = false;
        }, 1000);
      },
      (error) => {
        if (error !== 200) {
          console.log(error);
          this.LoginError();
          this.formLogin.reset();
          this.loading = false;
        }
      }
    );

    // if (username === 'admin' && password === 'admin123') {
    // } else {
    //   //no autheticated
    //   this.LoginError();
    // }
  }

  LoginError() {
    this._snackBar.open('Username or password are invalid', '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
