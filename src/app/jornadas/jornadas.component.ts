import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Jornada } from '../shared/interfaces/general';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase/app';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-jornadas',
  templateUrl: './jornadas.component.html',
  styleUrls: ['./jornadas.component.css']
})
export class JornadasComponent implements OnInit {
  jornadas: Observable<Jornada[]>;
  constructor(private http: HttpClient, private afs: AngularFirestore) {}

  ngOnInit() {
    const url = './assets/data/partidos.json';
    this.jornadas = this.http.get<Jornada[]>(url);
    this.jornadas
      .pipe(
        map(val => {
          const { partidos } = val[0];
          const partidosF = partidos.map(match => {
            const { id, local, visitante } = match;
            const fecha = new Date(
              match.fecha[0],
              match.fecha[1],
              match.fecha[2],
              match.fecha[3],
              match.fecha[4]
            );
            return { id, local, visitante, fecha };
          });
          return partidosF;
        })
      )
      .subscribe(val => {
        console.log('jornadas sub', val);
        // const ref = this.afs.collection('jornadas').doc('nMJpaoWKFugFTeYXuTz4');
        // ref.update({
        //   partidos: firestore.FieldValue.arrayUnion(...val)
        // });
      });
    // this.create();
  }

  async create() {
    const data = {
      jornada: 1,
      partidos: []
    };

    const docRef = await this.afs.collection('jornadas').add(data);
    console.log('docRef', docRef);
  }

  async guardarPartidos() {
    this.jornadas.subscribe(val => console.log('jornadas sub', val));
    const data = {
      createdAt: Date.now()
    };

    // const ref = this.afs.collection('jornadas').doc('nMJpaoWKFugFTeYXuTz4');
    // ref.update({
    //   partidos: firestore.FieldValue.arrayUnion(data)
    // });
  }
}
