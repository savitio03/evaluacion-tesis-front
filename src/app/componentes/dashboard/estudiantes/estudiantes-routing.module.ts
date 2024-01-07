import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstudiantesComponent } from './estudiantes.component';
import { EvaluacionesComponent } from './evaluaciones/evaluaciones.component';
import { SubirTesisComponent } from './subir-tesis/subir-tesis.component';
import { DetallesComponent } from './detalles/detalles.component';

const routes: Routes = [
  {
    path: '',
    component: EstudiantesComponent,
    children: [
      { path: 'evaluaciones', component: EvaluacionesComponent },
      { path: 'subir-tesis', component: SubirTesisComponent },
      { path: 'detalle-tesis/:id', component: DetallesComponent },
      { path: '', redirectTo: 'evaluaciones', pathMatch: 'full' },
      { path: '**', redirectTo: 'evaluaciones', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstudiantesRoutingModule {}
