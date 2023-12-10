import { Component } from '@angular/core';
import { Usuario } from '../../models/clases/Usuario';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogoComponent } from '../dialogo/dialogo.component';
import { DialogoConfirmarComponent } from '../dialogo-confirmar/dialogo-confirmar.component';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css'],
})
export class TopBarComponent {
  title = 'Tesis Unisinu';
  nombreUsuario = 'Nombre Usuario';

  constructor(public dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    // Obtener datos del localStorage
    const usuarioString = localStorage.getItem('usuario');

    if (usuarioString) {
      const usuario: Usuario = JSON.parse(usuarioString);

      this.nombreUsuario = usuario.nombre;
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

  cerrarSesion() {
    const dialogRef = this.dialog.open(DialogoConfirmarComponent, {
      data: { mensaje: '¿Estás seguro de que quieres cerrar la sesión?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Si result es true, el usuario confirmó la acción
        // Agrega aquí la lógica para cerrar sesión
        localStorage.removeItem('usuario');
        this.router.navigate(['/inicio-sesion']);
      }
      // Si result es false, el usuario canceló la acción
    });
  }
}
