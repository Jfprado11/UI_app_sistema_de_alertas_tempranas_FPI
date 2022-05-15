import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

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
    private router: Router
  ) {
    this.formLogin = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  logIn() {
    console.log(this.formLogin);
    const username = this.formLogin.value.username;
    const password = this.formLogin.value.password;

    if (username === 'admin' && password === 'admin123') {
      this.router.navigate(['dashboard']);
    } else {
      //no autheticated
      this.LoginError();
      this.formLogin.reset();
    }
  }

  LoginError() {
    this._snackBar.open('Username or password are invalid', '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
