import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AprobacionesComponent } from './aprobaciones/aprobaciones.component';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'aprobaciones', component: AprobacionesComponent },
      { path: '', redirectTo: 'aprobaciones', pathMatch: 'full' },
      { path: '**', redirectTo: 'aprobaciones', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
