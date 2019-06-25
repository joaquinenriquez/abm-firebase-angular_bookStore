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
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'offers', component: OffersComponent, canActivate: [AuthGuard] },
  { path: 'book/:id', component: DetallesLibroComponent},
  { path: 'admin/list-books', component: ListadoLibrosComponent, canActivate: [AuthGuard]},
  { path: 'user/login', component: LoginComponent},
  { path: 'user/register', component: RegisterComponent},
  { path: 'user/profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: '**', component: Page404Component }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
