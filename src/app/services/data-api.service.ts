import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import { ILibro } from '../models/ilibro';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class DataApiService {

  private coleccionLibros: AngularFirestoreCollection<ILibro>;
  private libros: Observable<ILibro[]>;

  private libroDoc: AngularFirestoreDocument<ILibro>;
  private libro: Observable<ILibro>;

  public libroSeleccionado: ILibro = {
    id: null
  };



  constructor(private afs: AngularFirestore) {
    this.coleccionLibros = afs.collection<ILibro>('libros'); // Es el nombre de la coleccion que creamos en la consola de firebase
    this.libros = this.coleccionLibros.valueChanges();
  }

  getTodosLosLibros() {
    // return this.libros;
    return this.libros = this.coleccionLibros.snapshotChanges()
    .pipe(map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as ILibro;
        data.id = action.payload.doc.id;
        return data;
      });
    })); // todo esto es para poder traernos el id (lo crea automaticamente firebase en nuestra coleccion)
  }

  getUnLibro(idLibro: string) {

    this.libroDoc = this.afs.doc<ILibro>(`libros/${idLibro}`); // Vamos a la coleccion libros de firebase y filtramos por el id


    return this.libro = this.libroDoc.snapshotChanges().pipe(map(action => {
      if (action.payload.exists === false ) {
        return null;
      } else {
        const data = action.payload.data() as ILibro;
        data.id = action.payload.id;
        return data;
      }
    }));

  }

  getLibro() {}



  addLibro(nuevoLibro: ILibro): void {
    this.coleccionLibros.add(nuevoLibro);
  }

  updateLibro(unLibro: ILibro): void {
    const idLibro = unLibro.id;
    console.log(unLibro);
    this.libroDoc = this.afs.doc<ILibro>(`libros/${idLibro}`);
    this.libroDoc.update(unLibro);
  }
  deleteLibro(idLibro: string): void {
    this.libroDoc = this.afs.doc<ILibro>(`libros/${idLibro}`); // Filtramos el libro por id
    this.libroDoc.delete();
  }




}

