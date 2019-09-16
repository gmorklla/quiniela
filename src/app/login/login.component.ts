import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { DbService } from '../shared/services/db.service';
import { mergeMap, filter, take } from 'rxjs/operators';
import { of, iif } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(
    public afAuth: AngularFireAuth,
    private db: DbService,
    private auth: AuthService
  ) {}

  login() {
    this.afAuth.auth
      .signInWithPopup(new auth.GoogleAuthProvider())
      .then(user => {
        this.checkUser(user);
      })
      .catch(err =>
        console.error(
          '%c login err ',
          'background: crimson; color: white;',
          err
        )
      );
  }

  checkUser(user: auth.UserCredential) {
    const { uid } = user.user;
    const undefined$ = of(false);
    const exist$ = of(true);
    this.db
      .read('users', uid)
      .pipe(
        take(1),
        mergeMap(user$ => iif(() => user$ === undefined, undefined$, exist$)),
        filter(exist => !exist)
      )
      .subscribe(_ => this.saveUserInfoInDB(user));
  }

  saveUserInfoInDB(user: auth.UserCredential) {
    const { uid, displayName, photoURL } = user.user;
    this.db
      .createCustomId('users', { uid, displayName, photoURL }, uid)
      .then(_ =>
        this.db.createCustomId('pronosticos', { 1: { resultado: '' } }, uid)
      )
      .then(_ => console.log('%c user saved ', 'background: yellowgreen;'))
      .catch(err =>
        console.error(
          '%c Error creando usuario ',
          'background: crimson; color: white;',
          err
        )
      );
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
