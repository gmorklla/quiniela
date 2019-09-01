import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JornadasComponent } from './jornadas.component';

const routes: Routes = [{ path: '', component: JornadasComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JornadasRoutingModule { }
