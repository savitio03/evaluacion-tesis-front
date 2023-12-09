import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { RegistrarseComponent } from './registrarse/registrarse.component';
import { LoginComponent } from './login.component';
import { EvaluarTesisComponent } from '../dashboard/evaluadores/evaluar-tesis/evaluar-tesis.component';
import { EvaluarComponent } from '../dashboard/evaluadores/evaluar/evaluar.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    children: [
      { path: '', component: InicioSesionComponent },
      { path: 'registrarse', component: RegistrarseComponent },
      { path: '', redirectTo: '', pathMatch: 'full' },
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
