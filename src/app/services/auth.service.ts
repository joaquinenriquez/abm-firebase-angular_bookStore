import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { auth } from 'firebase';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { IUsuario } from '../models/iusuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afsAuth: AngularFireAuth, private afs: AngularFirestore) { }

  registerUser(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.afsAuth.auth.createUserWithEmailAndPassword(email, pass)
      .then(userData => {
        resolve(userData),
        this.updateDatosUsusuario(userData.user);
      })
      .catch(err => console.log(reject(err)));
    });
  }


  loginEmailUser(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.afsAuth.auth.signInWithEmailAndPassword(email, pass)
      .then(userData => resolve(userData),
      err => reject(err));
    });
  }

  loginFacebookUser(){
    // Cuando nos logeamos nos devuelve un objeto y ese objete le pasamos el usuario a nuestro metodo
    return this.afsAuth.auth.signInWithPopup(new auth.FacebookAuthProvider())
    .then(credential => { this.updateDatosUsusuario(credential.user)});
  }

  loginGoogleUser() {
    // Cuando nos logeamos nos devuelve un objeto y ese objete le pasamos el usuario a nuestro metodo
    //return this.afsAuth.auth.signInWithRedirect(new auth.GoogleAuthProvider())
    return this.afsAuth.auth.signInWithRedirect(new auth.GoogleAuthProvider());
    //.then((credenciales) => this.updateDatosUsusuario(credenciales.user));
  }

  logoutUser() {
    return this.afsAuth.auth.signOut();
  }

  isAuth() {
    return this.afsAuth.authState.pipe(map(auth => auth));
  }

  private updateDatosUsusuario(usuario) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`usuarios/${usuario.uid}`);
    const datos: IUsuario = {
      id: usuario.uid,
      email: usuario.email,
      roles: {
        admin: true,
        editor: true
      }
    };
    return userRef.set(datos, {merge: true});
  }

  esAdmin(userUid) {
    return this.afs.doc<IUsuario>(`usuarios/${userUid}`).valueChanges();
  }




}
