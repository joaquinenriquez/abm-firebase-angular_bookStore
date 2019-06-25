import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public email: string = '';
  public password: string = '';
  public isError: boolean = false;

  uploadPercent: Observable<number>;
  urlImage: Observable<string>;

  @ViewChild('imageUser') inputImageUser: ElementRef;

  constructor(private authService: AuthService, private router: Router, private storage: AngularFireStorage) { }

  ngOnInit() {
  }

  onAddUser() {
    this.authService.registerUser(this.email, this.password)
    .then((res) => {
      this.authService.isAuth().subscribe( user => {
        /*
          Como el servicio de firebase nos logea automaticamente, una vez creado el usuario preguntamos si esta
          logeado. En caso de estarlo le modificamos el perfil para agregarle la foto (ya que firebase no nos permite
          agregar la foto al momento de registrar)
        */
        if (user) {
          user.updateProfile( {
            photoURL: this.inputImageUser.nativeElement.value
          }).then(() => { // Actualizar el perfil nos devuelve otra promesa
            this.router.navigate(['usuario/profile']);
          }).catch((error) => console.log('error', error));
        }
      });
    })
    .catch(err => console.log('err', err.message));
  }

  onUpload(e) {
    //console.log('err', e.target.files[0]);
    // Creamos un id aleatorio para que no nos suban archivos con el mismo nombre
    const id = Math.random().toString(36).substring(2);
    // Nos traemos el archivo desde el input por medio del parametro $event
    const file = e.target.files[0];
     // Esta es la ruta de donde queremos guardarlo dentro de Firebase
    const filePath = `upload/profile_${id}`;
    // Creamos una referencia al path de donde vamos a guardar los archivos
    const ref = this.storage.ref(filePath);
    // Lo subimos mediante el el metodo upload y pasamos como parametros la referencia y el archivo
    const task = this.storage.upload(filePath, file);

    console.log('subido');

    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();

  }

}
