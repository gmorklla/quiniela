import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, iif, of } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';
import { DbService } from './../shared/services/db.service';
import { Partido, User } from '../shared/interfaces/general';
import { AngularFirestore } from '@angular/fire/firestore';
import { mergeMap, take, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { equipos } from './../../assets/data/data';

@Component({
  selector: 'app-jornadas',
  templateUrl: './jornadas.component.html',
  styleUrls: ['./jornadas.component.css']
})
export class JornadasComponent implements OnInit {
  partidos: Observable<Partido[]>;
  pronosticos;
  pronosticosGenerales;
  usuarios;
  notificacion: { partido: Partido; usuario: User; pronostico: string };

  constructor(
    private db: DbService,
    public auth: AuthService,
    private afs: AngularFirestore,
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.getUsuarios();
    this.getPartidos();
    this.getPronosticos();
  }

  getUsuarios() {
    this.db.readCollection('users').subscribe(users => (this.usuarios = users));
  }

  getJornada(idx: number): number {
    return Number.isInteger(idx / 16)
      ? idx === 0
        ? 1
        : Math.floor(idx / 16) + 1
      : Math.floor(idx / 16) + 1;
  }

  getPartidos() {
    this.partidos = this.db.readCollection('partidos');
  }

  getPronosticos() {
    const { uid } = this.auth.getLoggedUser();
    this.db
      .readCollectionWIds('pronosticos')
      .pipe(
        tap((pronos: Array<any>) => {
          this.pronosticosGenerales = pronos;
          this.pronosticos = pronos.filter(val => val.id === uid)[0];
        })
      )
      .subscribe(_ => {});
  }

  savePronostico(e: string, partido: Partido) {
    const { uid, displayName, photoURL } = this.auth.getLoggedUser();
    this.notificacion = {
      partido,
      usuario: { uid, displayName, photoURL },
      pronostico: e
    };
    const ref = this.afs.collection('pronosticos').doc(uid);
    const obj = {};
    obj[partido.id] = {
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
      .then(_ => {
        this.openSnackBar('Pronóstico guardado', 'Ok');
        this.getPronosticos();
        this.mandarNotificacion();
      })
      .catch(err =>
        console.error('%c error ', 'background: crimson; color: white;', err)
      );
  }

  set(obj, uid) {
    const ref = this.afs.collection('pronosticos').doc(uid);
    ref
      .set(obj)
      .then(_ => {
        this.mandarNotificacion();
        this.openSnackBar('Pronóstico guardado', 'Ok');
      })
      .catch(err =>
        console.error('%c error ', 'background: crimson; color: white;', err)
      );
  }

  mandarNotificacion() {
    const url =
      'https://us-central1-quiniela-6e42b.cloudfunctions.net/pronostico';
    const {
      usuario: { displayName, photoURL },
      partido: { local, visitante },
      pronostico
    } = this.notificacion;
    const lName = equipos.filter(eq => eq.id === local);
    const vName = equipos.filter(eq => eq.id === visitante);
    const params = new HttpParams()
      .set('usuario', displayName)
      .set('local', lName[0].nombre)
      .set('visitante', vName[0].nombre)
      .set('pronostico', pronostico)
      .set('photo', photoURL);
    this.http
      .get(url, { params })
      .subscribe(res => console.log('notificacion res', res));
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }

  validaFecha(partido: Partido): boolean {
    const date = new Date();
    return partido.fecha.toDate() > date;
  }
}
