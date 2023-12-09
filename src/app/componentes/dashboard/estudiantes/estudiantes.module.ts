import { CompartidosModule } from './../../compartidos/compartidos.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstudiantesComponent } from './estudiantes.component';
import { EvaluacionesComponent } from './evaluaciones/evaluaciones.component';
import { SubirTesisComponent } from './subir-tesis/subir-tesis.component';
import { EstudiantesRoutingModule } from './estudiantes-routing.module';

@NgModule({
  declarations: [
    EstudiantesComponent,
    EvaluacionesComponent,
    SubirTesisComponent,
  ],
  imports: [CommonModule, CompartidosModule, EstudiantesRoutingModule],
})
export class EstudiantesModule {}
