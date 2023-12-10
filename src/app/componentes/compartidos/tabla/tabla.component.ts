import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css'],
})
export class TablaComponent {
  @Input() config: TablaConfig = {
    columnas: [],
    dato: [],
    datos: [],
  };

  constructor() {}

  editarDato(dato: any) {
    //do an formulario de edición
  }

  verDetalle(dato: any) {
    // Aquí puedes implementar la lógica para editar el dato, por ejemplo, abrir un formulario de edición.
    console.log('Editar dato:', dato);
  }
}

export interface TablaConfig {
  columnas: string[];
  dato: string[];
  datos: any[];
}
