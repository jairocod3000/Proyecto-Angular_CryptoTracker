import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  constructor(public auth: AuthService) { }

  ngOnInit(){
    this.auth.checkAuthState();
  }

  normalLogin(){
    this.auth.normalLogin(this.email, this.password);
  }

  googleLogin(){
    this.auth.googleLogin();
  }

  githubLogin(){
    this.auth.githubLogin();
  }
}
