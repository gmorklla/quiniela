import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Jornada } from '../shared/interfaces/general';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-jornadas',
  templateUrl: './jornadas.component.html',
  styleUrls: ['./jornadas.component.css']
})
export class JornadasComponent implements OnInit {
  jornadas: Observable<Jornada[]>;
  constructor(private http: HttpClient) {}

  ngOnInit() {
    const url = './assets/data/partidos.json';
    this.jornadas = this.http.get<Jornada[]>(url);
  }
}
