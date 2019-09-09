import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { User, Partido } from '../interfaces/general';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  constructor(private afs: AngularFirestore) {}

  create(
    collection: string,
    data: any
  ): Promise<firebase.firestore.DocumentReference> {
    return this.afs.collection(collection).add(data);
  }

  createCustomId(
    collection: string,
    data: any,
    id: string = null
  ): Promise<void> {
    return this.afs
      .collection(collection)
      .doc(id)
      .set(data);
  }

  read(collection: string, documentId: string): Observable<User> {
    return this.afs
      .collection(collection)
      .doc<User>(documentId)
      .valueChanges();
  }

  readPartidosCollection(collection: string): Observable<Partido[]> {
    return this.afs.collection<Partido>(collection).valueChanges();
  }

  saveGames(
    partidos: {
      id: number;
      local: number;
      visitante: number;
      fecha: Date;
    }[]
  ): Promise<void> {
    const batch = this.afs.firestore.batch();
    partidos.forEach(partido => {
      const ref = this.afs.firestore
        .collection('partidos')
        .doc(partido.id.toString());
      batch.set(ref, partido);
    });
    return batch.commit();
  }
}
