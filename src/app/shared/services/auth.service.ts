import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../interfaces/general';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private loggedUser: User;

  public get user(): Observable<firebase.User> {
    return this.afAuth.user;
  }

  public getLoggedUser(): User {
    return this.loggedUser;
  }

  public setLoggedUser(user: User) {
    this.loggedUser = user;
  }

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {}
}
