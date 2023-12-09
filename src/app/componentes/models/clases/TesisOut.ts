import { Resultado } from './Resultado';
import { Tesis } from './Tesis';

export class TesisOut extends Resultado {
  tesis: Tesis;
  listaTesis: Tesis[];
  totalTesis: number;

  constructor(
    exitoso: boolean,
    mensajeError: string | null,
    mensaje: string | null,
    tesis: Tesis,
    listaTesis: Tesis[],
    totalTesis: number
  ) {
    super(exitoso, mensajeError, mensaje);
    this.tesis = tesis;
    this.listaTesis = listaTesis;
    this.totalTesis = totalTesis;
  }
}
