import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  email = '';
  password = '';
  constructor(public auth: AuthService) { }

  ngOnInit(){
    this.auth.checkAuthState();
  }

  normalRegister(){
    this.auth.register(this.email, this.password);
  }

  googleRegister(){
    this.auth.googleLogin();
  }

  githubRegister(){
    this.auth.githubLogin();
  }
}
