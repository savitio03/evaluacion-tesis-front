import { SesionService } from './../../services/sesion.service';
import { RolUsuarioEnum } from './../../models/enums/RolUsuarioEnum';
import { TipoIdentificacionEnum } from './../../models/enums/TipoIdentificacionEnum';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProgramaEnum } from '../../models/enums/ProgramaEnum';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SexoEnum } from '../../models/enums/SexoEnum';
import { DialogoComponent } from '../../compartidos/dialogo/dialogo.component';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.css'],
})
export class RegistrarseComponent {
  formulario: FormGroup;
  programasEnum = ProgramaEnum;
  sexoEnum = SexoEnum;
  tipoIdentificacionEnum = TipoIdentificacionEnum;
  rol = RolUsuarioEnum;

  seleccionado = false;
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private fb: FormBuilder,
    private sesionService: SesionService
  ) {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      segundoNombre: [''],
      apellido: ['', Validators.required],
      segundoApellido: [''],
      codigoCarnet: ['', Validators.required],
      tipoIdentificacionEnum: ['', Validators.required],
      numeroIdenticacion: ['', Validators.required],
      sexoEnum: ['', Validators.required],
      rol: ['', Validators.required],
      numeroCelular: [''],
      correo: ['', Validators.required],
      password: ['', Validators.required],
      confirmarPassword: ['', Validators.required],
      programaEnum: ['', Validators.required],
    });
  }

  onSubmit() {
    // Aquí puedes manejar la lógica de envío del formulario
    console.log(this.formulario.value);
    if (this.formulario.valid) {
      if (
        this.formulario.get('password')?.value !=
        this.formulario.get('confirmarPassword')?.value
      ) {
        this.dialogo('Error', 'Las contraseñas no coinciden.');
      } else {
        console.log(this.formulario.value.tipoIdentificacionEnum.value);
        console.log(this.formulario.value.rol.value);
        console.log(this.formulario.value.sexoEnum.value);
        console.log(this.formulario.value.programaEnum.value);

        this.sesionService.registrarse(this.formulario.value).subscribe(
          (response) => this.handleSuccess(response),
          (error) => this.handleError(error)
        );
      }
    }

    // Por ejemplo, podrías enviar los datos al servidor
  }

  handleSuccess(response: any): void {
    if (response.exitoso == false) {
      this.dialogo('Error', response.mensaje);
    } else {
      this.dialogo('Registro exitoso', 'Se ha registrado correctamente.');
      this.router.navigate(['/inicio-sesion']);
    }
  }

  handleError(error: any): void {
    this.dialogo('Error', 'No se ha podido registrar.');
  }

  keys(): Array<string> {
    var keys = Object.keys(this.programasEnum);
    return keys.slice(keys.length / 2);
  }

  keysSexo(): Array<string> {
    var keys = Object.keys(this.sexoEnum);
    return keys.slice(keys.length / 2);
  }

  keyRol(): Array<string> {
    var keys = Object.keys(this.rol);
    return keys.slice(keys.length / 2);
  }

  keysTipoIdentificacion(): Array<string> {
    var keys = Object.keys(this.tipoIdentificacionEnum);
    return keys.slice(keys.length / 2);
  }

  dialogo(mensaje: string, mensajeDialogo: string) {
    this.dialog.open(DialogoComponent, {
      data: {
        mensaje: mensaje,
        mensajeDialogo: mensajeDialogo,
      },
    });
  }
}
