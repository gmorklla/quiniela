import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Equipo, Grupos } from '../shared/interfaces/general';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  grupos: Observable<Grupos[]>;
  constructor(private http: HttpClient) {}

  ngOnInit() {
    const url = './assets/data/grupos.json';
    this.grupos = this.http.get<Grupos[]>(url);
  }
}
