import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { saveAs } from 'file-saver';
import { DialogoConfirmarComponent } from 'src/app/componentes/compartidos/dialogo-confirmar/dialogo-confirmar.component';
import { DialogoComponent } from 'src/app/componentes/compartidos/dialogo/dialogo.component';
import { Tesis } from 'src/app/componentes/models/clases/Tesis';
import { TesisEstudiante } from 'src/app/componentes/models/clases/TesisEstudiante';
import { Usuario } from 'src/app/componentes/models/clases/Usuario';
import { CalificadaEnum } from 'src/app/componentes/models/enums/CalificadaEnum';
import { RolUsuarioEnum } from 'src/app/componentes/models/enums/RolUsuarioEnum';
import { TesisService } from 'src/app/componentes/services/tesis.service';

@Component({
  selector: 'app-evaluar',
  templateUrl: './evaluar.component.html',
  styleUrls: ['./evaluar.component.css'],
})
export class EvaluarComponent {
  id: number | null = null;
  tesis!: Tesis;
  tesisEstudiantes: TesisEstudiante[] = [];
  CalificadaEnum: CalificadaEnum = CalificadaEnum.SIN_CALIFICAR;

  tesisForm!: FormGroup;
  cargando: boolean = true;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private tesisService: TesisService,
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    const usuarioString = localStorage.getItem('usuario');

    if (usuarioString) {
      const usuario: Usuario = JSON.parse(usuarioString);

      if (
        RolUsuarioEnum[usuario.rol].toString() ===
          RolUsuarioEnum.PROFESOR.toString() ||
        RolUsuarioEnum[usuario.rol].toString() ===
          RolUsuarioEnum.ADMINISTRADOR.toString()
      ) {
        console.log('El usuario tiene permisos para acceder');

        // Obtener el id del parámetro de la ruta
        this.route.params.subscribe((params) => {
          this.id = params['id'];
        });

        if (this.id) {
          this.consultarDetalleTesis(this.id);
        }
      } else {
        console.log('El usuario no tiene permisos para acceder');
        this.dialogo(
          'Error',
          'No tiene permisos para acceder a esta funcionalidad.'
        );
        this.router.navigate(['/login']);
      }
    } else {
      console.log('No hay usuario en el localStorage');
      this.dialogo(
        'Error',
        'Debe iniciar sesión para acceder a esta funcionalidad.'
      );
      this.router.navigate(['/login']);
    }
  }

  consultarDetalleTesis(idTesis: number): void {
    // Iniciar el spinner antes de la llamada a la API
    this.cargando = true;

    // Lógica para consultar el detalle de la tesis
    this.tesisService.consultaDetalleTesis(idTesis).subscribe(
      (data: any) => {
        if (data && data.exitoso) {
          this.tesis = data.tesisDTO;
          this.tesisEstudiantes = data.tesisEstudianteDTO;
          console.log(this.tesis);

          this.tesisForm.patchValue({
            calificacion: this.tesis.calificacion || null,
            observaciones: this.tesis.observaciones || '',
          });
        } else {
          console.log(data.mensaje);
        }

        // Detener el spinner después de obtener los datos
        this.cargando = false;
      },
      (error) => {
        this.dialogo(
          'Error',
          'Ha ocurrido un error al consultar el detalle de la tesis'
        );

        // Detener el spinner en caso de error
        this.cargando = false;
      }
    );
  }

  createForm() {
    this.tesisForm = this.fb.group({
      calificacion: ['', Validators.required],
      observaciones: ['', Validators.required],
    });
  }

  descargar(dato: any): void {
    const byteCharacters = atob(dato.documento);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);

    const blob = new Blob([byteArray], { type: 'application/pdf' });
    const nombreArchivo = `documentoTesis.${dato.extension}`;
    saveAs(blob, nombreArchivo);
  }

  guardarCalificacion() {
    const dialogRef = this.dialog.open(DialogoConfirmarComponent, {
      data: {
        mensaje: 'Guardar Calificación',
        mensajeDialogo: '¿Estás seguro que quiere guardar los cambios?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (this.tesisForm.valid) {
          // Guardar la información aquí, por ejemplo, usando un servicio
          const calificacion = this.tesisForm.get('calificacion')?.value;
          const observaciones = this.tesisForm.get('observaciones')?.value;
          this.tesis.calificacion = calificacion;
          this.tesis.observaciones = observaciones;
          this.tesisService.evaluarTesis(this.tesis).subscribe(
            (data) => {
              this.dialogo(
                'Éxito',
                'Se ha guardado la calificación de la tesis'
              );
              this.router.navigate(['/evaluar-tesis']);
            },
            (error) => {
              this.dialogo(
                'Error',
                'Ha ocurrido un error al guardar la calificación de la tesis'
              );
            }
          );

          console.log('Calificación guardada:', calificacion);
          console.log('Observaciones guardadas:', observaciones);
        }
      }
      // Si result es false, el usuario canceló la acción
    });
  }

  dialogo(mensaje: string, mensajeDialogo: string) {
    this.dialog.open(DialogoComponent, {
      data: {
        mensaje: mensaje,
        mensajeDialogo: mensajeDialogo,
      },
    });
  }

  imprimir(): void {
    window.print();
  }
}
