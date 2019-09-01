import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioRoutingModule } from './inicio-routing.module';
import { InicioComponent } from './inicio.component';
import { MaterialModule } from '../material/material.module';
import { GrupoTablaComponent } from './grupo-tabla/grupo-tabla.component';

@NgModule({
  declarations: [InicioComponent, GrupoTablaComponent],
  imports: [CommonModule, InicioRoutingModule, MaterialModule]
})
export class InicioModule {}
