import { Component, OnInit } from '@angular/core';
import { Observable, iif, of, from } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';
import { firestore } from 'firebase/app';
import { DbService } from './../shared/services/db.service';
import { Partido } from '../shared/interfaces/general';
import { AngularFirestore } from '@angular/fire/firestore';
import { mergeMap, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-jornadas',
  templateUrl: './jornadas.component.html',
  styleUrls: ['./jornadas.component.css']
})
export class JornadasComponent implements OnInit {
  partidos: Observable<Partido[]>;
  pronosticos: Observable<any>;

  constructor(
    private db: DbService,
    public auth: AuthService,
    private afs: AngularFirestore
  ) {}

  ngOnInit() {
    this.getPartidos();
    this.getPronosticos();
  }

  getJornada(idx: number): number {
    return Number.isInteger(idx / 16)
      ? idx === 0
        ? 1
        : Math.floor(idx / 16)
      : Math.floor(idx / 16) + 1;
  }

  getPartidos() {
    this.partidos = this.db.readCollection('partidos');
  }

  getPronosticos() {
    // this.pronosticos = this.db.readCollection('pronosticos');
    this.db
      .readCollection('pronosticos')
      .subscribe(val =>
        console.log('%c pronosticos ', 'background: yellowgreen;', val)
      );
  }

  savePronostico(e: string, partidoId: number) {
    const { uid } = this.auth.getLoggedUser();
    const ref = this.afs.collection('pronosticos').doc(uid);
    const obj = {};
    obj[partidoId] = {
      resultado: e
    };
    ref
      .valueChanges()
      .pipe(
        take(1),
        mergeMap(v => iif(() => !v, of(false), of(true)))
      )
      .subscribe(val => {
        if (val) {
          this.update(obj, uid);
        } else {
          this.set(obj, uid);
        }
      });
  }

  update(obj, uid) {
    const ref = this.afs.collection('pronosticos').doc(uid);
    ref
      .update(obj)
      .then(_ => console.log('pronostico guardado'))
      .catch(err =>
        console.error('%c error ', 'background: crimson; color: white;', err)
      );
  }

  set(obj, uid) {
    const ref = this.afs.collection('pronosticos').doc(uid);
    ref
      .set(obj)
      .then(_ => console.log('pronostico guardado'))
      .catch(err =>
        console.error('%c error ', 'background: crimson; color: white;', err)
      );
  }
}
