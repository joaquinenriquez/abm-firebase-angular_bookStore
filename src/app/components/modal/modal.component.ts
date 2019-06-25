import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { DataApiService } from 'src/app/services/data-api.service';
import { NgForm } from '@angular/forms';
import { ILibro } from 'src/app/models/ilibro';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  unLibro: ILibro = {};
  @ViewChild('btnCerrar') btnCerrar: ElementRef;
  @Input() userUid: string;

  constructor(public dataApi: DataApiService) { }

  ngOnInit() {
  }

  onGuardarLibro(formLibro: NgForm): void{
    if (formLibro.value.id === null) { // Si el id es null entonces estamos editando
      formLibro.value.userUid = this.userUid;
      this.dataApi.addLibro(formLibro.value);
    } else {
      this.dataApi.updateLibro(formLibro.value);
    }

    formLibro.resetForm();

    this.btnCerrar.nativeElement.click();

  }


}
