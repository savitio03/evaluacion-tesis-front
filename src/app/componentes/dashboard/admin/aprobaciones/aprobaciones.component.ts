import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogoConfirmarComponent } from 'src/app/componentes/compartidos/dialogo-confirmar/dialogo-confirmar.component';
import { DialogoComponent } from 'src/app/componentes/compartidos/dialogo/dialogo.component';
import { Usuario } from 'src/app/componentes/models/clases/Usuario';
import { RolUsuarioEnum } from 'src/app/componentes/models/enums/RolUsuarioEnum';
import { UsuariosService } from 'src/app/componentes/services/usuarios.service';

@Component({
  selector: 'app-aprobaciones',
  templateUrl: './aprobaciones.component.html',
  styleUrls: ['./aprobaciones.component.css'],
})
export class AprobacionesComponent {
  listaUsuarios!: Usuario[];

  accionTexto: string = 'Cambiar';
  accionesConfig: { [key: string]: (dato: any) => void } = {
    Aprobar: (dato) => this.aprobar(dato),
    Rechazar: (dato) => this.rechazar(dato),
  };

  constructor(
    private usuariosService: UsuariosService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    const usuarioString = localStorage.getItem('usuario');

    if (usuarioString) {
      const usuario: Usuario = JSON.parse(usuarioString);
      if (
        RolUsuarioEnum[usuario.rol].toString() ===
        RolUsuarioEnum.ADMINISTRADOR.toString()
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
    this.usuariosService.usuariosAprobaciones().subscribe((response) => {
      console.log(response);
      this.listaUsuarios = response.listaUsuarioDTO;
      console.log(this.listaUsuarios);
    });
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

  aprobar(dato: any) {
    this.dialogoAprobar(
      'Aprobar usuario',
      '¿Está seguro que desea aprobar la cuenta del usuario?',
      dato.idUsuario
    );
  }

  rechazar(dato: any) {
    this.dialogoRechazar(
      'Rechazar usuario',
      '¿Está seguro que desea rechazar la cuenta del usuario?',
      dato.idUsuario
    );
  }

  /**
   * Aprobar la cuenta de usuario
   * @param mensaje
   * @param mensajeDialogo
   * @param idUsuario
   */
  dialogoAprobar(mensaje: string, mensajeDialogo: string, idUsuario: number) {
    const dialogRef = this.dialog.open(DialogoConfirmarComponent, {
      width: '350px',
      data: { mensaje: mensaje, mensajeDialogo: mensajeDialogo },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.usuariosService.aprobarUsuario(idUsuario).subscribe((response) => {
          console.log(response);
          this.dialogoExito(
            'Operación exitosa',
            'Usuario aprobado exitosamente'
          );
        });
        window.location.reload();
      }
    });
  }

  /**
   * Rechazar la cuenta de usuario
   * @param mensaje
   * @param mensajeDialogo
   */
  dialogoRechazar(mensaje: string, mensajeDialogo: string, idUsuario: number) {
    const dialogRef = this.dialog.open(DialogoConfirmarComponent, {
      width: '350px',
      data: { mensaje: mensaje, mensajeDialogo: mensajeDialogo },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.usuariosService
          .rechazarUsuario(idUsuario)
          .subscribe((response) => {
            console.log(response);
            this.dialogoExito(
              'Operación exitosa',
              'Usuario rechazado exitosamente'
            );
          });
        window.location.reload();
      }
    });
  }

  dialogoExito(mensaje: string, mensajeDialogo: string) {
    const dialogRef = this.dialog.open(DialogoComponent, {
      width: '250px',
      data: { mensaje: mensaje, mensajeDialogo: mensajeDialogo },
    });
  }
}
