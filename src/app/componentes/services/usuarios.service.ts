import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { UsuarioOut } from '../models/clases/UsuarioOut';
import { Resultado } from '../models/clases/Resultado';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private apiUrl = 'http://localhost:8080/usuario';

  constructor(private http: HttpClient) {}

  usuariosAprobaciones(): Observable<any> {
    return this.http.get<UsuarioOut[]>(
      `${this.apiUrl}/consultarUsuariosPorAprobar`
    );
  }

  aprobarUsuario(idUsuario: number): Observable<any> {
    return this.http.get<Resultado>(
      `${this.apiUrl}/aprobarUsuario?idUsuario=${idUsuario}`,
      {}
    );
  }

  rechazarUsuario(idUsuario: number): Observable<any> {
    return this.http.get<Resultado>(
      `${this.apiUrl}/rechazarUsuario?idUsuario=${idUsuario}`,
      {}
    );
  }
}
