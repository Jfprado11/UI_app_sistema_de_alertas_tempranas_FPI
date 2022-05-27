import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserGetInterface } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private URL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getUser(id: string) {
    return this.http.get<UserGetInterface>(`${this.URL}/api/v1/users/${id}`);
  }
}
