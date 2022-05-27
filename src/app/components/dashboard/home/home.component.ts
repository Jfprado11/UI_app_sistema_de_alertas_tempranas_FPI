import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import decodeJwt from 'jwt-decode';
import { JwtPayloadInterface } from 'src/app/interfaces/jwtPayload.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  dataName: string = '';

  constructor(private titleService: Title, private userService: UserService) {
    this.titleService.setTitle('Home');
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const { sub }: JwtPayloadInterface = decodeJwt(<string>token);
    this.userService.getUser(sub).subscribe((data) => {
      this.dataName = data.username;
    });
  }
}
