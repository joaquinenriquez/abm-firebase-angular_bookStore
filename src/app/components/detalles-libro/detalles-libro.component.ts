import { Component, OnInit } from '@angular/core';
import { DataApiService } from 'src/app/services/data-api.service';

import { ActivatedRoute, Params } from '@angular/router';
import { ILibro } from 'src/app/models/ilibro';

@Component({
  selector: 'app-detalles-libro',
  templateUrl: './detalles-libro.component.html',
  styleUrls: ['./detalles-libro.component.css']
})
export class DetallesLibroComponent implements OnInit {

  libro: ILibro;


  constructor(private dataApi: DataApiService, private route: ActivatedRoute) {
   }

  ngOnInit() {
    const idLibro = this.route.snapshot.params['id']; // Nos traemos el id que tenemos en la ruta
    this.traerDetalles(idLibro);
  }

  traerDetalles(idLibro: string) {
    this.dataApi.getUnLibro(idLibro).subscribe(libro => {
      this.libro = libro;
      console.log(this.libro);
    });
  }

}
