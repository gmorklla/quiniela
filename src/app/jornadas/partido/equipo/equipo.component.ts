import { Component, OnInit, Input } from '@angular/core';
import { Partido, Equipo } from '../../../shared/interfaces/general';

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.css']
})
export class EquipoComponent implements OnInit {
  @Input() equipo: Equipo;

  constructor() {}

  ngOnInit() {
    console.log('equipo', this.equipo);
  }
}
