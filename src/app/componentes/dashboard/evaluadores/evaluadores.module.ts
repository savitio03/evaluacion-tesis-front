import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EvaluadoresComponent } from './evaluadores.component';
import { EvaluarComponent } from './evaluar/evaluar.component';
import { CompartidosModule } from '../../compartidos/compartidos.module';
import { EvaluadoresComponentRoutingModule } from './evaluadores-routing.module';
import { EvaluarTesisComponent } from './evaluar-tesis/evaluar-tesis.component';
import { TesisService } from '../../services/tesis.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [EvaluadoresComponent, EvaluarComponent, EvaluarTesisComponent],
  imports: [CommonModule, CompartidosModule, EvaluadoresComponentRoutingModule, HttpClientModule],
  providers: [TesisService],
})
export class EvaluadoresModule {}
