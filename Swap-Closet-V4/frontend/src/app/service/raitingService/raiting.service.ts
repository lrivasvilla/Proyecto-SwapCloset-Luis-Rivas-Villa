import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UsuarioDTO} from "../../modelos/UsuarioDTO";
import {RaitingDTO} from "../../modelos/RaitingDTO";

@Injectable({
  providedIn: 'root'
})
export class RaitingService {
  private http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/api/raitings'; // ✅ URL completa

  getRaiting(id: number): Observable<RaitingDTO> {
    return this.http.get<RaitingDTO>(`${this.apiUrl}/${id}`)
  }

  getMediaRaitingByUsuario(idUsuario: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/usuario/${idUsuario}/media`);
  }
}
