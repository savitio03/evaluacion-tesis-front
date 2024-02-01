import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogoConfirmarComponent } from 'src/app/componentes/compartidos/dialogo-confirmar/dialogo-confirmar.component';
import { DialogoComponent } from 'src/app/componentes/compartidos/dialogo/dialogo.component';
import { Tesis } from 'src/app/componentes/models/clases/Tesis';
import { Usuario } from 'src/app/componentes/models/clases/Usuario';
import { EstadoCuentaEnum } from 'src/app/componentes/models/enums/EstadoCuentaEnum';
import { ProgramaEnum } from 'src/app/componentes/models/enums/ProgramaEnum';
import { RolUsuarioEnum } from 'src/app/componentes/models/enums/RolUsuarioEnum';
import { SexoEnum } from 'src/app/componentes/models/enums/SexoEnum';
import { TesisService } from 'src/app/componentes/services/tesis.service';
import { TipoIdentificacionEnum } from './../../../models/enums/TipoIdentificacionEnum';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-subir-tesis',
  templateUrl: './subir-tesis.component.html',
  styleUrls: ['./subir-tesis.component.css'],
})
export class SubirTesisComponent {
  formularioTesis: FormGroup;
  programasEnum = ProgramaEnum;
  tesisDTO!: Tesis;
  usuario!: Usuario;
  usuario2: Usuario = new Usuario(
    1,
    '',
    '',
    '',
    '',
    '',
    TipoIdentificacionEnum.CC,
    '',
    SexoEnum.MASCULINO,
    RolUsuarioEnum.ESTUDIANTE,

    '',
    '',
    '',
    ProgramaEnum.INGENIERIA_CIVIL,
    new Date(),
    '',
    EstadoCuentaEnum.APROBADO
  );
  archivoSeleccionado!: File;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private fb: FormBuilder,
    private tesisService: TesisService,
    private cdr: ChangeDetectorRef
  ) {
    this.formularioTesis = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      carnet2: [''],
      archivo: ['', Validators.required],
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
        this.usuario = usuario;
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

  onFileSelected(event: any): void {
    this.archivoSeleccionado = event.target.files[0];
  }

  onSubmit() {
    if (this.formularioTesis.valid) {
      const dialogRef = this.dialog.open(DialogoConfirmarComponent, {
        data: {
          mensaje: 'Subir tesis',
          mensajeDialogo: '¿Estás seguro que desea subir la tesis?',
        },
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.guardarTesis();
        }
      });
    }
  }

  keys(): Array<string> {
    var keys = Object.keys(this.programasEnum);
    return keys.slice(keys.length / 2);
  }

  guardarTesis() {
    if (this.formularioTesis.invalid) {
      return;
    }

    // Obtener datos del formulario
    const tesisDTO = new Tesis();
    tesisDTO.nombre = this.formularioTesis.get('nombre')?.value;
    tesisDTO.descripcion = this.formularioTesis.get('descripcion')?.value;
    tesisDTO.programaEnum = this.usuario.programaEnum;
    tesisDTO.estudiante = this.usuario;

    if (this.formularioTesis.get('carnet2')?.value) {
      this.usuario2.codigoCarnet = this.formularioTesis.get('carnet2')?.value;
      tesisDTO.estudiante2 = this.usuario2;
    }

    // Crear objeto FormData y agregar valores
    const formData = new FormData();
    formData.append(
      'tesisDTO',
      new Blob([JSON.stringify(tesisDTO)], { type: 'application/json' })
    );
    formData.append('archivo', this.archivoSeleccionado);

    // Enviar solicitud al servicio
    this.tesisService.guardarTesis(formData).subscribe(
      (data) => this.handleSuccessResponse(data),
      (err) => this.handleErrorResponse(err)
    );
  }

  private handleSuccessResponse(data: any) {
    console.log('Respuesta del servidor:', data);

    if (data.exitoso === false) {
      const dialogRef = this.dialog.open(DialogoComponent, {
        data: {
          mensaje: 'Error',
          mensajeDialogo: data.mensaje,
        },
      });
    } else {
      const dialogRef = this.dialog.open(DialogoComponent, {
        data: {
          mensaje: 'Tesis subida',
          mensajeDialogo: 'La tesis se subió correctamente.',
        },
      });

      this.formularioTesis.reset();
      this.formularioTesis.markAsPristine();
      this.formularioTesis.markAsUntouched();

      // Forzar actualización de la vista
      this.cdr.detectChanges();
    }
  }

  private handleErrorResponse(err: any) {
    console.log('Error al guardar la tesis:', err);

    this.dialog.open(DialogoComponent, {
      data: {
        mensaje: 'Error',
        mensajeDialogo: 'Error al guardar la tesis.',
      },
    });
  }
}
