import { Usuario } from 'src/app/componentes/models/clases/Usuario';
import { Tesis } from './Tesis';

export class TesisEstudiante {
  idTesisEstudiante: number;
  tesisDTOEstudiante: Tesis;
  usuarioDTOEstudiante: Usuario;

  constructor(idTesisEstudiante: number, tesisDTOEstudiante: Tesis, usuarioDTOEstudiante: Usuario) {
    this.idTesisEstudiante = idTesisEstudiante;
    this.tesisDTOEstudiante = tesisDTOEstudiante;
    this.usuarioDTOEstudiante = usuarioDTOEstudiante;
  }
}
