import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreadorJuegosComponent } from './creador-juegos.component';

const routes: Routes = [{ path: '', component: CreadorJuegosComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreadorJuegosRoutingModule { }
