import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JornadasRoutingModule } from './jornadas-routing.module';
import { JornadasComponent } from './jornadas.component';
import { PartidoComponent } from './partido/partido.component';
import { EquipoComponent } from './partido/equipo/equipo.component';
import { FechaComponent } from './partido/fecha/fecha.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    JornadasComponent,
    PartidoComponent,
    EquipoComponent,
    FechaComponent
  ],
  imports: [CommonModule, JornadasRoutingModule, MatCardModule]
})
export class JornadasModule {}
