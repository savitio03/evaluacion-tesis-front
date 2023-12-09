import { EstadoTesisEnum } from '../enums/EstadoTesisEnum';
import { ProgramaEnum } from '../enums/ProgramaEnum';
import { Usuario } from './Usuario';

export class Tesis {
  idTesis: number;
  nombre: string;
  descripcion: string;
  archivo: File; // Asumiendo que estás utilizando el tipo File para el equivalente a MultipartFile
  documento: Uint8Array; // Asumiendo que estás utilizando un array de bytes para el equivalente a byte[]
  estudiante: Usuario;
  programaEnum: ProgramaEnum;
  observaciones: string;
  calificacion: number; // Asumiendo que calificacion es un número
  calificada: boolean;
  evaluador: Usuario;
  estadoTesisEnum: EstadoTesisEnum;
  estudiante2: Usuario;

  constructor(
    idTesis: number,
    nombre: string,
    descripcion: string,
    archivo: File,
    documento: Uint8Array,
    estudiante: Usuario,
    programaEnum: ProgramaEnum,
    observaciones: string,
    calificacion: number,
    calificada: boolean,
    evaluador: Usuario,
    estadoTesisEnum: EstadoTesisEnum,
    estudiante2: Usuario
  ) {
    this.idTesis = idTesis;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.archivo = archivo;
    this.documento = documento;
    this.estudiante = estudiante;
    this.programaEnum = programaEnum;
    this.observaciones = observaciones;
    this.calificacion = calificacion;
    this.calificada = calificada;
    this.evaluador = evaluador;
    this.estadoTesisEnum = estadoTesisEnum;
    this.estudiante2 = estudiante2;
  }
}
