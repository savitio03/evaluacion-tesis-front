import { RolUsuarioEnum } from './../../models/enums/RolUsuarioEnum';
import { TipoIdentificacionEnum } from './../../models/enums/TipoIdentificacionEnum';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProgramaEnum } from '../../models/enums/ProgramaEnum';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SexoEnum } from '../../models/enums/SexoEnum';

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

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private fb: FormBuilder
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
      programaEnum: ['', Validators.required],
    });
  }

  onSubmit() {
    // Aquí puedes manejar la lógica de envío del formulario
    console.log(this.formulario.value);
    // Por ejemplo, podrías enviar los datos al servidor
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
}
