import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  public email: string =  '';
  public password: string = '';
  public isError: boolean = false;

  ngOnInit() {
  }


  onLogin(): void {
    this.authService.loginEmailUser(this.email, this.password)
    .then((res) => {
      this.onLoginRedirect();
      this.isError = false;
      console.log("Logeado");
    })
    .catch((err) => {
      console.log('ERROR:', err.message);
      this.isError = true;
    });
  }

  onLoginGoogle(): void {
    this.authService.loginGoogleUser()
    .then((res) => {
      // Aca tenemos los datos del usuario que nos provee el servicio de Google
      console.log('resUser', res);
      this.onLoginRedirect();
      this.isError = false;
      console.log("Logeado");
    })
    .catch( (err) => {
      this.isError = true;
      console.log('Error: ', err.message)
    }
    );
  }

  onLogout(): void {
    this.authService.logoutUser();
    console.log('Usuario deslogeado');
  }

  onLoginRedirect() {
    this.router.navigate(['offers']);
  }


}
