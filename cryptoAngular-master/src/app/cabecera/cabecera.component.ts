import { Component} from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent {
  constructor(public auth: AuthService) { }

  ngOnInit(){
    this.auth.checkAuthState();
  }

  logout(){
    this.auth.signOut();
  }
}
