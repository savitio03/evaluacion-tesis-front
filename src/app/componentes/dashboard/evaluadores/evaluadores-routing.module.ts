import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EvaluadoresComponent } from './evaluadores.component';
import { EvaluarComponent } from './evaluar/evaluar.component';
import { EvaluarTesisComponent } from './evaluar-tesis/evaluar-tesis.component';

const routes: Routes = [
  {
    path: '',
    component: EvaluadoresComponent,
    children: [
      { path: 'evaluar-tesis', component: EvaluarTesisComponent },
      { path: 'evaluar/:id', component: EvaluarComponent },
      { path: '', redirectTo: 'evaluar-tesis', pathMatch: 'full' },
      { path: '**', redirectTo: 'evaluar-tesis', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EvaluadoresComponentRoutingModule {}
