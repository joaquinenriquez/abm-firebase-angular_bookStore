import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { IUsuario } from 'src/app/models/iusuario';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private authService: AuthService) { }


  user: IUsuario;

  public providerId: string = null;


  ngOnInit() {
    this.authService.isAuth().subscribe(user => {
      if (user) {
        this.user.nombre = user.displayName;
        this.user.email = user.email;
        this.user.photoUrl = user.photoURL;
        this.providerId = user.providerData[0].providerId; // Indica con que se esta logeando
      }
    });
  }

}
