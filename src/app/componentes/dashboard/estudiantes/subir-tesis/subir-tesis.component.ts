import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogoComponent } from 'src/app/componentes/compartidos/dialogo/dialogo.component';
import { Usuario } from 'src/app/componentes/models/clases/Usuario';
import { RolUsuarioEnum } from 'src/app/componentes/models/enums/RolUsuarioEnum';

@Component({
  selector: 'app-subir-tesis',
  templateUrl: './subir-tesis.component.html',
  styleUrls: ['./subir-tesis.component.css'],
})
export class SubirTesisComponent {
  constructor(public dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    // Obtener datos del localStorage
    const usuarioString = localStorage.getItem('usuario');

    if (usuarioString) {
      const usuario: Usuario = JSON.parse(usuarioString);

      if (
        usuario.rol === RolUsuarioEnum.ESTUDIANTE ||
        usuario.rol === RolUsuarioEnum.ADMINISTRADOR
      ) {
        console.log('El usuario tiene permisos para acceder');
      } else {
        console.log('El usuario no tiene permisos para acceder');
        this.noLogueado('No tiene permisos para acceder a esta funcionalidad.');
        this.router.navigate(['/login']);
      }
    } else {
      console.log('No hay usuario en el localStorage');
      this.noLogueado('Debe iniciar sesión para acceder a esta funcionalidad.');
      this.router.navigate(['/login']);
    }
  }

  /**
   * Para cuando el servidor responde con error de credenciales
   */
  noLogueado(mensajeDialogo: string) {
    this.dialog.open(DialogoComponent, {
      data: {
        mensaje: 'Error',
        mensajeDialogo: mensajeDialogo,
      },
    });
  }
}
