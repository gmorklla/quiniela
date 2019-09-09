import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';
import { firestore } from 'firebase/app';
import { DbService } from './../shared/services/db.service';
import { Partido } from '../shared/interfaces/general';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-jornadas',
  templateUrl: './jornadas.component.html',
  styleUrls: ['./jornadas.component.css']
})
export class JornadasComponent implements OnInit {
  partidos: Observable<Partido[]>;

  constructor(
    private db: DbService,
    public auth: AuthService,
    private afs: AngularFirestore
  ) {}

  ngOnInit() {
    this.partidos = this.db.readPartidosCollection('partidos');
  }

  getJornada(idx: number): number {
    return Number.isInteger(idx / 16)
      ? idx === 0
        ? 1
        : Math.floor(idx / 16)
      : Math.floor(idx / 16) + 1;
  }

  savePronostico(e: string, partidoId: number) {
    console.log(
      '%c savePronostico ',
      'background: yellowgreen;',
      e,
      this.auth.getLoggedUser(),
      partidoId
    );
    const { uid } = this.auth.getLoggedUser();
    const ref = this.afs.collection('partidos').doc(partidoId.toString());
    ref
      .update({
        pronosticos: firestore.FieldValue.arrayUnion({ uid, result: e })
      })
      .then(_ => console.log('pronostico guardado'))
      .catch(err =>
        console.error('%c error ', 'background: crimson; color: white;', err)
      );
  }
}
