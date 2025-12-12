import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UsuarioDTO} from "../../modelos/UsuarioDTO";

@Injectable({
  providedIn: 'root'
})
export class SeguidoresService {
  private http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/api/seguidores';

  getCountSeguidores(idUsuario: number) {
    return this.http.get<number>(`${this.apiUrl}/usuario/${idUsuario}/count`);
  }

  getSeguidores(idUsuario: number) {
    return this.http.get<UsuarioDTO[]>(`${this.apiUrl}/usuario/${idUsuario}/seguidores`);
  }

  getSiguiendo(idUsuario: number) {
    return this.http.get<UsuarioDTO[]>(`${this.apiUrl}/usuario/${idUsuario}/seguidos`);
  }
}
