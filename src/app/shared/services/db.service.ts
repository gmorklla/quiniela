import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { User, Partido } from '../interfaces/general';
import { map } from 'rxjs/operators';

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

  read(collection: string, documentId: string): Observable<any> {
    return this.afs
      .collection(collection)
      .doc<any>(documentId)
      .valueChanges();
  }

  readCollection(collection: string): Observable<any> {
    return this.afs.collection<any>(collection).valueChanges();
  }

  readCollectionWIds(collection: string): Observable<any> {
    return this.afs
      .collection<any>(collection)
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }

  saveGame(partido: {
    id: number;
    local: number;
    visitante: number;
    fecha: Date;
  }): Promise<void> {
    const ref = this.afs.firestore
      .collection('partidos')
      .doc(partido.id.toString());
    return ref.set(partido);
    // const batch = this.afs.firestore.batch();
    // partidos.forEach(partido => {
    //   const ref = this.afs.firestore
    //     .collection('partidos')
    //     .doc(partido.id.toString());
    //   batch.set(ref, partido);
    // });
    // return batch.commit();
  }

  incrementaContador(): Promise<void> {
    const increment = firebase.firestore.FieldValue.increment(1);
    const contadorRef = this.afs.doc(`contadorPartidos/a0s3TCGThT5pyIfUxGT2`);
    return contadorRef.update({ contador: increment });
  }
}
