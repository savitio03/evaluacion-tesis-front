import { Component, Input, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css'],
})
export class TablaComponent implements AfterViewInit {
  @Input() config: TablaConfig = {
    columnas: [],
    dato: [],
    datos: [],
  };

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.config.datos);
    this.dataSource.paginator = this.paginator;
  }

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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  sortData(sort: Sort) {
    const data = this.config.datos.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = data;
      return;
    }

    this.dataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      const valueA = this.getPropertyValue(a, sort.active);
      const valueB = this.getPropertyValue(b, sort.active);

      return this.compare(valueA, valueB, isAsc);
    });
  }

  private getPropertyValue(obj: any, property: string): any {
    const properties = property.split('.');
    return properties.reduce((prev, curr) => prev[curr], obj);
  }

  private compare(a: any, b: any, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}

export interface TablaConfig {
  columnas: string[];
  dato: string[];
  datos: any[];
  accionesConfig?: { [key: string]: (dato: any) => void };
  clasesConfig?: { [key: string]: string };
}
