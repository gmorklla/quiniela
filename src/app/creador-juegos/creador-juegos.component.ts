import { Component, OnInit } from '@angular/core';
import { DbService } from '../shared/services/db.service';
import { Observable } from 'rxjs';
import { Partido, Contador } from '../shared/interfaces/general';

@Component({
  selector: 'app-creador-juegos',
  templateUrl: './creador-juegos.component.html',
  styleUrls: ['./creador-juegos.component.css']
})
export class CreadorJuegosComponent implements OnInit {
  partidos: Observable<Partido[]>;
  contador: Contador;

  constructor(private db: DbService) {}

  ngOnInit() {
    this.getPartidos();
    this.getContador();
  }

  getPartidos() {
    this.partidos = this.db.readCollection('partidos');
  }

  getContador() {
    this.db
      .read('contadorPartidos', 'a0s3TCGThT5pyIfUxGT2')
      .subscribe((num: Contador) => (this.contador = num));
  }

  partidoToSave(e: Partido) {
    this.db
      .saveGame(e)
      .then(_ => this.db.incrementaContador())
      .then(_ => this.getContador())
      .catch(error =>
        console.error('%c Error ', 'background: crimson; color: white;', error)
      );
  }
}
