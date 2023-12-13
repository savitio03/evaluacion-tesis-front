import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./componentes/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'evaluadores',
    loadChildren: () =>
      import('./componentes/dashboard/evaluadores/evaluadores.module').then(
        (m) => m.EvaluadoresModule
      ),
  },
  {
    path: 'estudiantes',
    loadChildren: () =>
      import('./componentes/dashboard/estudiantes/estudiantes.module').then(
        (m) => m.EstudiantesModule
      ),
  },
  {
    path: 'administrador',
    loadChildren: () =>
      import('./componentes/dashboard/admin/admin.module').then(
        (m) => m.AdminModule
      ),
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
