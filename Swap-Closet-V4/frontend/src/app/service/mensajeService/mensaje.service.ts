import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MensajeDTO} from "../../modelos/MensajeDTO";

@Injectable({
  providedIn: 'root'
})
export class MensajeService {
  private http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/api/mensajes'; //

  getMensaje(id: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.apiUrl}/${id}`)
  }
}
