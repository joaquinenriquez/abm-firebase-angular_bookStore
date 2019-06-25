import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { take, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate  {
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;

  constructor(private afsAuth: AngularFireAuth, private router: Router) {}

canActivate(
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  return this.afsAuth.authState
  .pipe(take(1))
  .pipe(map(authState => !!authState))
  .pipe(tap(auth => {
    if (!auth){
      this.router.navigate(['/user/login']);
    }
  }));
  }
}
