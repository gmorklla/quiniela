import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Equipo, Partido, Contador } from 'src/app/shared/interfaces/general';

@Component({
  selector: 'app-creador-forma',
  templateUrl: './creador-forma.component.html',
  styleUrls: ['./creador-forma.component.css']
})
export class CreadorFormaComponent implements OnInit {
  @Input() contador: Contador;
  @Output() partidoToSave = new EventEmitter<Partido>();
  creadorForm: FormGroup;
  equipos: Observable<Equipo[]>;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    this.initForm();
    this.getEquipos();
  }

  initForm() {
    this.creadorForm = this.fb.group({
      local: [null, Validators.required],
      visitante: [null, Validators.required],
      fecha: [null, Validators.required],
      hora: [null, Validators.required]
    });
  }

  getEquipos() {
    this.equipos = this.http.get<Equipo[]>('assets/data/equipos.json');
  }

  agregaPartido() {
    const { local, visitante, fecha, hora } = this.creadorForm.value;
    const date: Date = fecha;
    date.setHours(hora.hour, hora.minute);
    const partido: Partido = {
      local,
      visitante,
      id: this.contador.contador + 1,
      fecha: date
    };
    this.partidoToSave.emit(partido);
  }
}
