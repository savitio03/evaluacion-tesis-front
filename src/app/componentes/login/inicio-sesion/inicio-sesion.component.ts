import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogoComponent } from '../../compartidos/dialogo/dialogo.component';
import { Usuario } from '../../models/clases/Usuario';
import { EstadoCuentaEnum } from '../../models/enums/EstadoCuentaEnum';
import { SesionService } from '../../services/sesion.service';
import { RolUsuarioEnum } from './../../models/enums/RolUsuarioEnum';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css'],
})
export class InicioSesionComponent {
  loginForm: FormGroup;
  usuario!: Usuario;

  constructor(
    private fb: FormBuilder,
    private sesionService: SesionService,
    public dialog: MatDialog,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    console.log(this.loginForm.value);
    if (this.loginForm.valid) {
      const usuario: Usuario = {
        correo: this.loginForm.get('usuario')?.value,
        password: this.loginForm.get('password')?.value,
        idUsuario: 0,
        nombre: '',
        segundoNombre: '',
        apellido: '',
        segundoApellido: '',
        codigoCarnet: '',
        tipoIdentificacionEnum: 0,
        numeroIdenticacion: '',
        sexoEnum: 0,
        rol: 0,
        numeroCelular: '',
        programaEnum: 0,
        fechaCreacion: new Date(),
        estadoCuentaEnum: 0,
      };

      this.sesionService.iniciarSesion(usuario).subscribe(
        (response) => this.handleSuccess(response),
        (error) => this.handleError(error)
      );
    }
  }

  /**
   * Para cuando el servidor responde correctamente
   * @param response
   */
  private handleSuccess(response: any): void {


    if(response.exitoso == false){
      this.abrirDialogoErrorCredenciales();
      return;
    }

    // Guardar datos en localStorage
    localStorage.setItem('usuario', JSON.stringify(response.usuarioDTO));

    this.usuario = response.usuarioDTO;

    console.log(this.usuario);

    if (
      EstadoCuentaEnum[this.usuario.estadoCuentaEnum].toString() ===
      EstadoCuentaEnum.APROBADO.toString()
    ) {
      if (
        RolUsuarioEnum[this.usuario.rol].toString() ==
        RolUsuarioEnum.PROFESOR.toString()
      ) {
        this.router.navigate(['/evaluadores']);
        console.log('Profesor');
      } else if (
        RolUsuarioEnum[this.usuario.rol].toString() ===
        RolUsuarioEnum.ESTUDIANTE.toString()
      ) {
        this.router.navigate(['/estudiantes']);
      } else if (
        RolUsuarioEnum[this.usuario.rol].toString() ===
        RolUsuarioEnum.ADMINISTRADOR.toString()
      ) {
        this.router.navigate(['/administrador']);
      }
    } else if (
      EstadoCuentaEnum[this.usuario.estadoCuentaEnum].toString() ===
      EstadoCuentaEnum.PENDIENTE.toString()
    ) {
      console.log('Pendiente');
      this.dialogo(
        'Error al iniciar sesión',
        'Su cuenta está pendiente de aprobación. Comuníquese con el administrador.'
      );
    } else if (
      EstadoCuentaEnum[this.usuario.estadoCuentaEnum].toString() ===
      EstadoCuentaEnum.RECHAZADO.toString()
    ) {
      this.dialogo(
        'Error al iniciar sesión',
        'Su cuenta no ha sido aprobada. Comuníquese con el administrador.'
      );
    }
  }
  /**
   * Para cuando el servidor responde con error
   * @param error
   */
  private handleError(error: any): void {
    console.error('Error al iniciar sesión:', error);

    this.abrirDialogoErrorFuncional();
  }

  /**
   * Para cuando el servidor responde con error de credenciales
   */
  abrirDialogoErrorCredenciales() {
    this.dialog.open(DialogoComponent, {
      data: {
        mensaje: 'Error al iniciar sesión',
        mensajeDialogo:
          'Credenciales inválidas. Verifica tu usuario y contraseña.',
      },
    });
  }

  /**
   * Para cuando el servidor responde con error funcional
   */
  abrirDialogoErrorFuncional() {
    this.dialog.open(DialogoComponent, {
      data: {
        mensaje: 'Error al iniciar sesión',
        mensajeDialogo:
          'Ha ocurrido un suceso inesperado. Inténtalo de nuevo más tarde.',
      },
    });
  }

  /**
   * Para cuando el servidor responde con error funcional
   */
  dialogo(mensaje: string, mensajeDialogo: string) {
    this.dialog.open(DialogoComponent, {
      data: {
        mensaje: mensaje,
        mensajeDialogo: mensajeDialogo,
      },
    });
  }
}
