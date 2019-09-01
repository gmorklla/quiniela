import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./inicio/inicio.module').then(m => m.InicioModule)
  },
  {
    path: 'jornadas',
    loadChildren: () =>
      import('./jornadas/jornadas.module').then(m => m.JornadasModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
