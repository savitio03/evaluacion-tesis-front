import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resultado } from '../models/clases/Resultado';
import { Tesis } from '../models/clases/Tesis';
import { TesisOut } from '../models/clases/TesisOut';
import { ProgramaEnum } from '../models/enums/ProgramaEnum';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TesisService {
  private apiUrl = 'http://localhost:8080/tesis';

  constructor(private http: HttpClient) {}

  consultarTesis(): Observable<any> {
    return this.http.get<TesisOut>(`${this.apiUrl}/consultarTesis`);
  }

  consultaDetalleTesis(idTesis: number): Observable<any> {
    return this.http.get<TesisOut>(
      `${this.apiUrl}/consultarDetalleTesis?idTesis=${idTesis}`
    );
  }

  evaluarTesis(tesis: Tesis): Observable<any> {
    return this.http.post<Resultado>(`${this.apiUrl}/evaluarTesis`, tesis);
  }

  guardarTesis(tesis: FormData): Observable<any> {
    const headers = new HttpHeaders();
    return this.http.post<Resultado>(`${this.apiUrl}/guardarTesis`, tesis, { headers: headers });
  }

  consultarTesisPorPrograma(programaEnum: ProgramaEnum): Observable<any> {
    return this.http.get<TesisOut>(
      `${this.apiUrl}/consultarTesisPrograma?programaEnum=${programaEnum}`
    );
  }

  consultarTesisPorEstudiante(idEstudiante: number): Observable<any> {
    return this.http.get<TesisOut>(
      `${this.apiUrl}/consultarTesisEstudiante?idEstudiante=${idEstudiante}`
    );
  }

  consultarTesisPorevaluador(idEvaluador: number): Observable<any> {
    return this.http.get<TesisOut>(
      `${this.apiUrl}/consultarTesisEvaluador?idEvaluador=${idEvaluador}`
    );
  }
}
