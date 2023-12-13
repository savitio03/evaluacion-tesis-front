import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogoComponent } from 'src/app/componentes/compartidos/dialogo/dialogo.component';
import { Usuario } from 'src/app/componentes/models/clases/Usuario';
import { ProgramaEnum } from 'src/app/componentes/models/enums/ProgramaEnum';
import { RolUsuarioEnum } from 'src/app/componentes/models/enums/RolUsuarioEnum';

@Component({
  selector: 'app-subir-tesis',
  templateUrl: './subir-tesis.component.html',
  styleUrls: ['./subir-tesis.component.css'],
})
export class SubirTesisComponent {
  formularioTesis: FormGroup;
  programasEnum = ProgramaEnum;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.formularioTesis = this.fb.group({
      nombre: ['', Validators.required],
      programaEnum: ['', Validators.required],
      descripcion: [''],
      estudiante2: [''],
      archivo: [''],
    });
  }

  ngOnInit(): void {
    // Obtener datos del localStorage
    const usuarioString = localStorage.getItem('usuario');

    if (usuarioString) {
      const usuario: Usuario = JSON.parse(usuarioString);

      if (
        RolUsuarioEnum[usuario.rol].toString() ===
        RolUsuarioEnum.ESTUDIANTE.toString() ||
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

  onSubmit() {
    // Aquí puedes manejar la lógica de envío del formulario
    console.log(this.formularioTesis.value);
    // Por ejemplo, podrías enviar los datos al servidor
  }

  keys(): Array<string> {
    var keys = Object.keys(this.programasEnum);
    return keys.slice(keys.length / 2);
  }
}
