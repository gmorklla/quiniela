import { Component, OnInit, Input } from '@angular/core';
import { Equipo, Grupos } from '../../shared/interfaces/general';

@Component({
  selector: 'app-grupo-tabla',
  templateUrl: './grupo-tabla.component.html',
  styleUrls: ['./grupo-tabla.component.css']
})
export class GrupoTablaComponent implements OnInit {
  @Input() grupo: Grupos;
  displayedColumns: string[] = ['id', 'img', 'nombre'];

  constructor() {}

  ngOnInit() {}
}
