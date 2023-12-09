import { ProgramaEnum } from '../enums/ProgramaEnum';
import { RolUsuarioEnum } from '../enums/RolUsuarioEnum';
import { SexoEnum } from '../enums/SexoEnum';
import { TipoIdentificacionEnum } from '../enums/TipoIdentificacionEnum';

export class Usuario {
  idUsuario: number;
  nombre: string;
  segundoNombre: string;
  apellido: string;
  segundoApellido: string;
  codigoCarnet: string;
  tipoIdentificacionEnum: TipoIdentificacionEnum;
  numeroIdenticacion: string;
  sexoEnum: SexoEnum;
  rol: RolUsuarioEnum;
  numeroCelular: string;
  correo: string;
  password: string;
  programaEnum: ProgramaEnum;
  fechaCreacion: Date;

  constructor(
    idUsuario: number,
    nombre: string,
    segundoNombre: string,
    apellido: string,
    segundoApellido: string,
    codigoCarnet: string,
    tipoIdentificacionEnum: TipoIdentificacionEnum,
    numeroIdenticacion: string,
    sexoEnum: SexoEnum,
    rol: RolUsuarioEnum,
    numeroCelular: string,
    correo: string,
    password: string,
    programaEnum: ProgramaEnum,
    fechaCreacion: Date
  ) {
    this.idUsuario = idUsuario;
    this.nombre = nombre;
    this.segundoNombre = segundoNombre;
    this.apellido = apellido;
    this.segundoApellido = segundoApellido;
    this.codigoCarnet = codigoCarnet;
    this.tipoIdentificacionEnum = tipoIdentificacionEnum;
    this.numeroIdenticacion = numeroIdenticacion;
    this.sexoEnum = sexoEnum;
    this.rol = rol;
    this.numeroCelular = numeroCelular;
    this.correo = correo;
    this.password = password;
    this.programaEnum = programaEnum;
    this.fechaCreacion = fechaCreacion;
  }

}
