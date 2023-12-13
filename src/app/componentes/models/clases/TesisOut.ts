import { Resultado } from './Resultado';
import { Tesis } from './Tesis';
import { TesisEstudiante } from './TesisEstudiante';

export class TesisOut extends Resultado {
  tesisDTO: Tesis;
  listaTesisDTO: Tesis[];
  tesisEstudianteDTO: TesisEstudiante[];
  totalTesis: number;

  constructor(
    exitoso: boolean,
    mensajeError: string | null,
    mensaje: string | null,
    tesisDTO: Tesis,
    listaTesisDTO: Tesis[],
    listaTesisEstudianteDTO: TesisEstudiante[],
    totalTesis: number
  ) {
    super(exitoso, mensajeError, mensaje);
    this.tesisDTO = tesisDTO;
    this.listaTesisDTO = listaTesisDTO;
    this.tesisEstudianteDTO = listaTesisEstudianteDTO;
    this.totalTesis = totalTesis;
  }
}
