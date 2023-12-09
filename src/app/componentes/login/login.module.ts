import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { RegistrarseComponent } from './registrarse/registrarse.component';
import { LoginComponent } from './login.component';
import { CompartidosModule } from '../compartidos/compartidos.module';
import { LoginRoutingModule } from './login-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SesionService } from '../services/sesion.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [InicioSesionComponent, RegistrarseComponent, LoginComponent],
  imports: [CommonModule, CompartidosModule, LoginRoutingModule, HttpClientModule, ReactiveFormsModule],
  providers: [SesionService],
})
export class LoginModule {}
