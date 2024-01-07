import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogoComponent } from 'src/app/componentes/compartidos/dialogo/dialogo.component';
import { Tesis } from 'src/app/componentes/models/clases/Tesis';
import { TesisEstudiante } from 'src/app/componentes/models/clases/TesisEstudiante';
import { Usuario } from 'src/app/componentes/models/clases/Usuario';
import { CalificadaEnum } from 'src/app/componentes/models/enums/CalificadaEnum';
import { RolUsuarioEnum } from 'src/app/componentes/models/enums/RolUsuarioEnum';
import { TesisService } from 'src/app/componentes/services/tesis.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css'],
})
export class DetallesComponent {
  id: number | null = null;
  tesis!: Tesis;
  tesisEstudiantes: TesisEstudiante[] = [];
  CalificadaEnum: CalificadaEnum = CalificadaEnum.SIN_CALIFICAR;

  panelOpenState = false;
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private tesisService: TesisService,
    private datePipe: DatePipe,
    private route: ActivatedRoute
  ) {}

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
    // Lógica para consultar el detalle de la tesis
    this.tesisService.consultaDetalleTesis(idTesis).subscribe(
      (data: any) => {
        if (data && data.exitoso) {
          this.tesis = data.tesisDTO;
          this.tesisEstudiantes = data.tesisEstudianteDTO;
          console.log(this.tesis);
        } else {
          console.log(data.mensaje);
        }
      },
      (error) => {
        this.dialogo(
          'Error',
          'Ha ocurrido un error al consultar el detalle de la tesis'
        );
      }
    );
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

  dialogo(mensaje: string, mensajeDialogo: string) {
    this.dialog.open(DialogoComponent, {
      data: {
        mensaje: mensaje,
        mensajeDialogo: mensajeDialogo,
      },
    });
  }
}
