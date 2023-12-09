import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EvaluadoresComponent } from './evaluadores.component';
import { EvaluarComponent } from './evaluar/evaluar.component';
import { CompartidosModule } from '../../compartidos/compartidos.module';
import { EvaluadoresComponentRoutingModule } from './evaluadores-routing.module';
import { EvaluarTesisComponent } from './evaluar-tesis/evaluar-tesis.component';



@NgModule({
  declarations: [
    EvaluadoresComponent,
    EvaluarComponent,
    EvaluarTesisComponent
  ],
  imports: [
    CommonModule, CompartidosModule, EvaluadoresComponentRoutingModule
  ]
})
export class EvaluadoresModule { }
