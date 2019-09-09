import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable, of, iif } from 'rxjs';
import { AuthService } from './shared/services/auth.service';
import { tap, filter, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const t$ = of(true);
    const f$ = of(false);
    return this.auth.user.pipe(
      tap(user => {
        console.log('%cUser', 'background: yellowgreen;', user);
        if (user !== null) {
          const { uid, displayName, photoURL } = user;
          this.auth.setLoggedUser({ uid, displayName, photoURL });
        }
      }),
      mergeMap(v => iif(() => v !== null, t$, f$))
    );
  }
}
