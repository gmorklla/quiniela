import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'grupos',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./inicio/inicio.module').then(m => m.InicioModule)
  },
  {
    path: 'jornadas',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./jornadas/jornadas.module').then(m => m.JornadasModule)
  },
  { path: 'creador', loadChildren: () => import('./creador-juegos/creador-juegos.module').then(m => m.CreadorJuegosModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
