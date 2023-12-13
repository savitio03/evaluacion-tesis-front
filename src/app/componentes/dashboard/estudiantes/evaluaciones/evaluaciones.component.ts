import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogoComponent } from 'src/app/componentes/compartidos/dialogo/dialogo.component';
import { Tesis } from 'src/app/componentes/models/clases/Tesis';
import { Usuario } from 'src/app/componentes/models/clases/Usuario';
import { RolUsuarioEnum } from 'src/app/componentes/models/enums/RolUsuarioEnum';
import { TesisService } from 'src/app/componentes/services/tesis.service';
import { TesisEstudiante } from './../../../models/clases/TesisEstudiante';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-evaluaciones',
  templateUrl: './evaluaciones.component.html',
  styleUrls: ['./evaluaciones.component.css'],
})
export class EvaluacionesComponent {
  tesisEstudiante: TesisEstudiante[] = [];
  tesis: Tesis[] = [];

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private tesisService: TesisService,
    private datePipe: DatePipe
  ) {}

  accionesConfig: { [key: string]: (dato: any) => void } = {
    Detalle: (dato) => this.Detalle(dato),
  };

  Detalle(dato: any): void {}

  ngOnInit(): void {
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

        this.obtenerTesis(usuario.idUsuario);
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

  /**
   * Para cuando el servidor responde con error de credenciales
   */
  dialogo(mensaje: string, mensajeDialogo: string) {
    this.dialog.open(DialogoComponent, {
      data: {
        mensaje: mensaje,
        mensajeDialogo: mensajeDialogo,
      },
    });
  }

  obtenerTesis(idEstudiante: number) {
    this.tesisService.consultarTesisPorEstudiante(idEstudiante).subscribe(
      (data: any) => {
        if (data && data.exitoso) {
          this.tesisEstudiante = data.tesisEstudianteDTO;
          this.convertirTesisEstudianteATesis(this.tesisEstudiante);
          console.log(this.tesis);
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
        tesis.usuarioDTOEstudiante.fechaCreacion,
        'dd-MM-yyyy'
      );

      tesis.tesisDTOEstudiante.fechaCreacion = '' + fechaFormateada;
      this.tesis.push(tesis.tesisDTOEstudiante);
    }
  }
}
