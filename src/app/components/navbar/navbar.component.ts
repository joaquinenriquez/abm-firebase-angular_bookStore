import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public app_name: string = "Tienda de libros";
  public isLogged: boolean = false;

  constructor(private authService: AuthService, private afsAuth: AngularFireAuth) { }

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser(){
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        console.log('Usuario logeado');
        this.isLogged = true;
      } else {
        console.log('Usuario no logeado');
        this.isLogged = false;
      }
    })
  }

  onLogout(){
    this.authService.logoutUser();
  }

}
