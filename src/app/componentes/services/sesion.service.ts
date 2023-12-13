import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { Usuario } from '../models/clases/Usuario';
import { EstadoCuentaEnum } from '../models/enums/EstadoCuentaEnum';
import { ProgramaEnum } from '../models/enums/ProgramaEnum';
import { RolUsuarioEnum } from '../models/enums/RolUsuarioEnum';
import { SexoEnum } from '../models/enums/SexoEnum';
import { TipoIdentificacionEnum } from '../models/enums/TipoIdentificacionEnum';
import { UsuarioOut } from '../models/clases/UsuarioOut';

@Injectable({
  providedIn: 'root',
})
export class SesionService {
  private apiUrl = 'http://localhost:8080/usuario';

  constructor(private http: HttpClient) {}

  iniciarSesion(usuario: Usuario): Observable<any> {
    return this.http.post<UsuarioOut>(`${this.apiUrl}/consultarUsuario`, usuario);
    // Simula el servicio de inicio de sesión
    /*const usuarioSimulado = {
      idUsuario: 1,
      nombre: 'Savio',
      segundoNombre: 'SegundoNombre',
      apellido: 'Apellido',
      segundoApellido: 'SegundoApellido',
      codigoCarnet: 'C12345',
      tipoIdentificacionEnum: TipoIdentificacionEnum.CC,
      numeroIdenticacion: '123456789',
      sexoEnum: SexoEnum.MASCULINO,
      rol: RolUsuarioEnum.ADMINISTRADOR,
      numeroCelular: '123-456-789',
      correo: 'usuario@example.com',
      password: '', // No devuelvas la contraseña en la respuesta
      programaEnum: ProgramaEnum.INGENIEIA_ELECTRICA,
      fechaCreacion: new Date(),
      estadoCuentaEnum: EstadoCuentaEnum.APROBADO,
    };

    // Simula un retardo para emular el tiempo de respuesta del servidor
    return of(usuarioSimulado).pipe(delay(1000))*/;
  }

  registrarse(usuario: Usuario): Observable<any> {
    return this.http.post<Usuario>(`${this.apiUrl}/guardarUsuario`, usuario);
  }
}
