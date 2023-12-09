import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ProgramaEnum } from '../models/enums/ProgramaEnum';
import { Tesis } from '../models/clases/Tesis';
import { Resultado } from '../models/clases/Resultado';
import { TesisOut } from '../models/clases/TesisOut';

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

  guardarTesis(tesis: Tesis): Observable<any> {
    return this.http.post<Resultado>(`${this.apiUrl}/guardarTesis`, tesis);
  }

  consultarTesisPorPrograma(programaEnum: ProgramaEnum): Observable<any> {
    return this.http.get<TesisOut>(
      `${this.apiUrl}/consultarTesisPrograma?programaEnum=${programaEnum}`
    );
  }

  consultarTesisPorEstudiante(idEstudiante: ProgramaEnum): Observable<any> {
    return this.http.get<TesisOut>(
      `${this.apiUrl}/consultarTesisEstudiante?idEstudiante=${idEstudiante}`
    );
  }

  consultarTesisPorevaluador(idEvaluador: ProgramaEnum): Observable<any> {
    return this.http.get<TesisOut>(
      `${this.apiUrl}/consultarTesisEvaluador?idEvaluador=${idEvaluador}`
    );
  }
}
