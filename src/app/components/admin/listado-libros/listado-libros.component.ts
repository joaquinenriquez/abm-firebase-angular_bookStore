import { Component, OnInit } from '@angular/core';
import { DataApiService } from 'src/app/services/data-api.service';
import { NgForm } from '@angular/forms';
import { ILibro } from 'src/app/models/ilibro';

import {AngularFireAuth} from '@angular/fire/auth';
import {AuthService} from '../../../services/auth.service';
import {IUsuario} from 'src/app/models/iusuario';

@Component({
  selector: 'app-listado-libros',
  templateUrl: './listado-libros.component.html',
  styleUrls: ['./listado-libros.component.css']
})
export class ListadoLibrosComponent implements OnInit {

  libros: ILibro[];

  public isAdmin: any = null;  // La creamos como any para que en caso que no la podamos recuperar por defecto no sea false
  public userUid: string = null;

  constructor(private dataApi: DataApiService, private authService: AuthService) { }

  ngOnInit() {
    this.getListadoLibros();
    this.traerUsuarioActual();
  }

  getListadoLibros() {
    this.dataApi.getTodosLosLibros().subscribe( libros => {
      this.libros = libros;
    });
  }

  onDeleteLibro(idLibro: string): void {
    const confirmacion = confirm ('Esta seguro?');
    if (confirmacion)
    {
      this.dataApi.deleteLibro(idLibro);
    }
  }

  onPreModificarLibro(unLibro: ILibro) {
    this.dataApi.libroSeleccionado = Object.assign({}, unLibro);
    console.log(unLibro);
  }

  traerUsuarioActual() {
    this.authService.isAuth().subscribe( auth => {
      this.userUid = auth.uid;
      this.authService.esAdmin(this.userUid).subscribe(userRole => {
        this.isAdmin = Object.assign({}, userRole.roles);
        this.isAdmin = this.isAdmin.hasOwnProperty('admin');
      });
    });
  }

}
