import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserLogInterface } from '../interfaces/userLog.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private URL = 'https://api-sistemas-alertas-tempranas.herokuapp.com';

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  signIn(user: UserLogInterface) {
    return this.http.post(`${this.URL}/api/v1/auth/login`, user);
  }

  isAuth(): boolean {
    const token = <string | undefined>localStorage.getItem('token');
    if (
      this.jwtHelper.isTokenExpired(token) ||
      !localStorage.getItem('token')
    ) {
      return false;
    }
    return true;
  }
}
