import { Component, OnInit } from '@angular/core';
import { DataApiService } from 'src/app/services/data-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public libros = [];
  public libro = '';

  constructor(private dataApi: DataApiService) { }

  ngOnInit() {
    this.dataApi.getTodosLosLibros().subscribe(libros => {
      console.log('Libros:', libros);
      this.libros = libros;
    });
  }

}
