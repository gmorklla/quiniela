import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject, iif, of } from 'rxjs';
import { take, mergeMap, filter, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesWebService {
  currentMessage = new BehaviorSubject(null);

  constructor(
    private db: AngularFirestore,
    private afAuth: AngularFireAuth,
    private messaging: AngularFireMessaging
  ) {}

  updateToken(token) {
    let user;
    this.afAuth.authState
      .pipe(
        take(1),
        filter(val => val !== null),
        tap(val => (user = val)),
        switchMap(val =>
          this.db
            .collection('fcmTokens')
            .doc(val.uid)
            .get()
        ),
        mergeMap(v => iif(() => !v, of(false), of(true)))
      )
      .subscribe(val => {
        if (val) {
          this.update(user, token);
        } else {
          this.set(user, token);
        }
      });
  }

  set(user, token) {
    this.db
      .collection('fcmTokens')
      .doc(user.uid)
      .set({ token })
      .then(_ => console.log('Token guardado', 'Ok'))
      .catch(err =>
        console.error('%c error ', 'background: crimson; color: white;', err)
      );
  }

  update(user, token) {
    this.db
      .collection('fcmTokens')
      .doc(user.uid)
      .update({ token })
      .then(_ => console.log('Token guardado', 'Ok'))
      .catch(err =>
        console.error('%c error ', 'background: crimson; color: white;', err)
      );
  }

  getPermission() {
    this.messaging.requestPermission
      .pipe(
        take(1),
        switchMap(_ => this.messaging.getToken)
      )
      .subscribe(
        token => this.updateToken(token),
        error => console.log('Error:', error)
      );
  }

  receiveMessage() {
    this.messaging.messages.subscribe(payload => {
      console.log('Message received. ', payload);
      this.currentMessage.next(payload);
    });
  }
}
