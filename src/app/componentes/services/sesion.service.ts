import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/clases/Usuario';

@Injectable({
  providedIn: 'root',
})
export class SesionService {
  private apiUrl = 'http://localhost:8080/usuario';

  constructor(private http: HttpClient) {}

  iniciarSesion(usuario: Usuario): Observable<any> {
    return this.http.post<Usuario>(`${this.apiUrl}/consultarUsuario`, usuario);
  }

  registrarse(usuario: Usuario): Observable<any> {
    return this.http.post<Usuario>(`${this.apiUrl}/guardarUsuario`, usuario);
  }

}
