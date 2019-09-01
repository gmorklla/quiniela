import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Partido, Equipo } from '../../shared/interfaces/general';

@Component({
  selector: 'app-partido',
  templateUrl: './partido.component.html',
  styleUrls: ['./partido.component.css']
})
export class PartidoComponent implements OnInit {
  @Input() partido: Partido;
  equipos: Equipo[];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    console.log('partido', this.partido);
    const url = './assets/data/equipos.json';
    this.http.get<Equipo[]>(url).subscribe(equipos => (this.equipos = equipos));
  }

  getEquipo(id: number): Equipo {
    if (!this.equipos) {
      return;
    }
    return this.equipos.filter(eq => eq.id === id)[0];
  }
}