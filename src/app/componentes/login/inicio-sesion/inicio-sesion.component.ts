import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SesionService } from '../../services/sesion.service';
import { Usuario } from '../../models/clases/Usuario';
import { MatDialog } from '@angular/material/dialog';
import { DialogoComponent } from '../../compartidos/dialogo/dialogo.component';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css'],
})
export class InicioSesionComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private sesionService: SesionService,
    public dialog: MatDialog
  ) {
    this.loginForm = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
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
      };

      this.sesionService.iniciarSesion(usuario).subscribe(
        (response) => this.handleSuccess(response),
        (error) => this.handleError(error)
      );
    }
  }

  private handleSuccess(response: any): void {
    console.log('Respuesta del servidor:', response);

   // this.abrirDialogoErrorFuncional();
  }

  private handleError(error: any): void {
    console.error('Error al iniciar sesión:', error);

    this.abrirDialogoErrorFuncional();
  }

  abrirDialogoErrorCredenciales() {
    this.dialog.open(DialogoComponent, {
      data: {
        mensaje: 'Error al iniciar sesión',
        mensajeDialogo: 'Credenciales inválidas. Verifica tu usuario y contraseña.',
      },
    });
  }

  abrirDialogoErrorFuncional() {
    this.dialog.open(DialogoComponent, {
      data: {
        mensaje: 'Error al iniciar sesión',
        mensajeDialogo: 'Ha ocurrido un suceso inesperado. Inténtalo de nuevo más tarde.',
      },
    });
  }
}
