import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JornadasRoutingModule } from './jornadas-routing.module';
import { MaterialModule } from '../material/material.module';
import { JornadasComponent } from './jornadas.component';
import { PartidoComponent } from './partido/partido.component';
import { EquipoComponent } from './partido/equipo/equipo.component';

@NgModule({
  declarations: [JornadasComponent, PartidoComponent, EquipoComponent],
  imports: [CommonModule, JornadasRoutingModule, MaterialModule]
})
export class JornadasModule {}
