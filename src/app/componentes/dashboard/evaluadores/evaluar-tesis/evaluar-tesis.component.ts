import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogoComponent } from 'src/app/componentes/compartidos/dialogo/dialogo.component';
import { Tesis } from 'src/app/componentes/models/clases/Tesis';
import { TesisEstudiante } from 'src/app/componentes/models/clases/TesisEstudiante';
import { Usuario } from 'src/app/componentes/models/clases/Usuario';
import { ProgramaEnum } from 'src/app/componentes/models/enums/ProgramaEnum';
import { RolUsuarioEnum } from 'src/app/componentes/models/enums/RolUsuarioEnum';
import { TesisService } from 'src/app/componentes/services/tesis.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-evaluar-tesis',
  templateUrl: './evaluar-tesis.component.html',
  styleUrls: ['./evaluar-tesis.component.css'],
})
export class EvaluarTesisComponent {
  tesisEstudiante: TesisEstudiante[] = [];
  tesis: Tesis[] = [];

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private tesisService: TesisService,
    private datePipe: DatePipe
  ) {}

  accionesConfig: { [key: string]: (dato: any) => void } = {
    Descargar: (dato) => this.descargar(dato),
    Evaluar: (dato) => this.evaluar(dato),
  };

  descargar(dato: any): void {
    console.log(dato);
    const byteCharacters = atob(dato.documento);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);

    // Convertir a Blob
    const blob = new Blob([byteArray], { type: 'application/pdf' }); // Cambia el tipo MIME según el tipo de documento

    // Descargar el Blob
    const nombreArchivo = 'documentoTesis.'+ dato.extension;
    saveAs(blob, nombreArchivo);
  }

  obtenerExtension(): string {
    return '.pdf';
  }

  evaluar(dato: any): void {}

  ngOnInit(): void {
    // Obtener datos del localStorage
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
        this.obtenerTesis(usuario.programaEnum);
        console.log(usuario.programaEnum);
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

  obtenerTesis(programaEnum: ProgramaEnum) {
    this.tesisService.consultarTesisPorPrograma(programaEnum).subscribe(
      (data: any) => {
        if (data && data.exitoso) {
          this.tesisEstudiante = data.tesisEstudianteDTO;
          this.convertirTesisEstudianteATesis(this.tesisEstudiante);
          console.log(this.tesisEstudiante);
        } else {
          console.log(data.mensaje);
        }
      },
      (error) => {
        console.error('Error al obtener las tesis:', error);
      }
    );
  }

  convertirTesisEstudianteATesis(tesisEstudiante: TesisEstudiante[]) {
    for (let tesis of tesisEstudiante) {
      let fechaFormateada = this.datePipe.transform(
        tesis.tesisDTOEstudiante.fechaCreacion,
        'dd-MM-yyyy'
      );

      tesis.tesisDTOEstudiante.fechaCreacion = '' + fechaFormateada;
      this.tesis.push(tesis.tesisDTOEstudiante);
    }
  }
}
