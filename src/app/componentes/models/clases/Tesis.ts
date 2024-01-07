import { CalificadaEnum } from '../enums/CalificadaEnum';
import { EstadoTesisEnum } from '../enums/EstadoTesisEnum';
import { ProgramaEnum } from '../enums/ProgramaEnum';
import { Usuario } from './Usuario';

export class Tesis {
  idTesis!: number;
  nombre!: string;
  descripcion!: string;
  archivo!: File; // Asumiendo que estás utilizando el tipo File para el equivalente a MultipartFile
  documento!: Uint8Array; // Asumiendo que estás utilizando un array de bytes para el equivalente a byte[]
  estudiante!: Usuario;
  programaEnum!: ProgramaEnum;
  observaciones!: string;
  calificacion!: number; // Asumiendo que calificacion es un número
  calificada!: CalificadaEnum;
  evaluador!: Usuario;
  estadoTesisEnum!: EstadoTesisEnum;
  estudiante2!: Usuario;
  fechaCreacion!: string;
  extension!: string;

  constructor() {}
}
