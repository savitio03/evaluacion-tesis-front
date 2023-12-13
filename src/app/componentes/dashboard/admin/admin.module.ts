import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CompartidosModule } from '../../compartidos/compartidos.module';
import { UsuariosService } from '../../services/usuarios.service';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AprobacionesComponent } from './aprobaciones/aprobaciones.component';

@NgModule({
  declarations: [AprobacionesComponent, AdminComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    CompartidosModule,
    AdminRoutingModule,
  ],
  providers: [UsuariosService],
})
export class AdminModule {}
