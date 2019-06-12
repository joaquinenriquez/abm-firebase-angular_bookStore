import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { OffersComponent } from './components/offers/offers.component';
import { DetallesLibroComponent } from './components/detalles-libro/detalles-libro.component';
import { ListadoLibrosComponent } from './components/admin/listado-libros/listado-libros.component';
import { LoginComponent } from './components/usuarios/login/login.component';
import { RegisterComponent } from './components/usuarios/register/register.component';
import { ProfileComponent } from './components/usuarios/profile/profile.component';
import { Page404Component } from './components/page404/page404.component';

const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'offers', component: OffersComponent},
  { path: 'book:/id', component: DetallesLibroComponent},
  { path: 'admin/lists-books', component: ListadoLibrosComponent},
  { path: 'user/login', component: LoginComponent},
  { path: 'user/register', component: RegisterComponent},
  { path: 'usuario/profile', component: ProfileComponent},
  { path: '**', component: Page404Component }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
