import { CompartidosModule } from './../../compartidos/compartidos.module';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { EstudiantesComponent } from './estudiantes.component';
import { EvaluacionesComponent } from './evaluaciones/evaluaciones.component';
import { SubirTesisComponent } from './subir-tesis/subir-tesis.component';
import { EstudiantesRoutingModule } from './estudiantes-routing.module';
import { TesisService } from '../../services/tesis.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    EstudiantesComponent,
    EvaluacionesComponent,
    SubirTesisComponent,
  ],
  imports: [CommonModule, CompartidosModule, EstudiantesRoutingModule, HttpClientModule],
  providers: [TesisService, DatePipe],
})
export class EstudiantesModule {}
