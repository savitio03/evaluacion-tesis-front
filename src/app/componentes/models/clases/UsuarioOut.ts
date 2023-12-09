import { Resultado } from './Resultado';
import { Usuario } from './Usuario';

export class UsuarioOut extends Resultado {
  usuario: Usuario;
  listaUsuario: Usuario[];
  totalUsuario: number;

  constructor(
    exitoso: boolean,
    mensajeError: string | null,
    mensaje: string | null,
    usuario: Usuario,
    listaUsuario: Usuario[],
    totalUsuario: number
  ) {
    super(exitoso, mensajeError, mensaje);
    this.usuario = usuario;
    this.listaUsuario = listaUsuario;
    this.totalUsuario = totalUsuario;
  }
}
