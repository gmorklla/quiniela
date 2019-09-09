import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { JornadasRoutingModule } from './jornadas-routing.module';
import { JornadasComponent } from './jornadas.component';
import { PartidoComponent } from './partido/partido.component';
import { EquipoComponent } from './partido/equipo/equipo.component';
import { FechaComponent } from './partido/fecha/fecha.component';
import { ScoreComponent } from './score/score.component';
import { MatButtonModule } from '@angular/material/button';
import { OrderPartidosPipe } from '../shared/pipes/order-partidos.pipe';

@NgModule({
  declarations: [
    JornadasComponent,
    PartidoComponent,
    EquipoComponent,
    FechaComponent,
    ScoreComponent,
    OrderPartidosPipe
  ],
  imports: [
    CommonModule,
    JornadasRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatSelectModule,
    MatButtonModule
  ]
})
export class JornadasModule {}
