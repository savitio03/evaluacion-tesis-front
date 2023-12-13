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

  ejecutarAccion(dato: any, accionKey: string) {
    const accion = this.config.accionesConfig
      ? this.config.accionesConfig[accionKey]
      : undefined;

    if (accion) {
      accion(dato);
    }
  }

  getAccionesConfigKeys(): string[] {
    return this.config.accionesConfig
      ? Object.keys(this.config.accionesConfig)
      : [];
  }
}

export interface TablaConfig {
  columnas: string[];
  dato: string[];
  datos: any[];
  accionesConfig?: { [key: string]: (dato: any) => void };
  clasesConfig?: { [key: string]: string };
}
