export class Resultado {
  exitoso: boolean;
  mensajeError: string | null; // Puedes cambiar el tipo según tus necesidades
  mensaje: string | null;

  constructor(
    exitoso: boolean,
    mensajeError: string | null,
    mensaje: string | null
  ) {
    this.exitoso = exitoso;
    this.mensajeError = mensajeError;
    this.mensaje = mensaje;
  }
}
