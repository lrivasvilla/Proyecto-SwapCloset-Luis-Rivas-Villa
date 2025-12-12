import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
import {UsuarioDTO} from "../../modelos/UsuarioDTO";
import {ProductoDTO} from "../../modelos/ProductoDTO";
import {LoginDTO} from "../../modelos/LoginDTO";
import {UsuarioEstadisticasDTO} from "../../modelos/UsuarioEstadisticasDTO";
import {CartaUsuarioDTO} from "../../modelos/CartaUsuarioDTO";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/api/usuarios'; // ✅ URL completa

  getUsuario(id: number): Observable<UsuarioDTO> {
    return this.http.get<UsuarioDTO>(`${this.apiUrl}/${id}`)
  }
  guardarUsuario(usuario: UsuarioDTO): Observable<UsuarioDTO> {
    return this.http.post<UsuarioDTO>(this.apiUrl, usuario);
  }

  verificarEmail(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/exists/email/${email}`);
  }

  loginUsuario(email: string, password: string): Observable<LoginDTO> {
    return this.http.post<LoginDTO>(`${this.apiUrl}/login`, { email, password });
  }

  // Obtener estadísticas de un usuario por ID
  getUsuarioEstadisticas(id: number): Observable<UsuarioEstadisticasDTO> {
    return this.http.get<UsuarioEstadisticasDTO>(`${this.apiUrl}/estadisticas/${id}`);
  }

  // Obtener estadísticas de todos los usuarios
  getUsuariosEstadisticasTodos(): Observable<UsuarioEstadisticasDTO[]> {
    return this.http.get<UsuarioEstadisticasDTO[]>(`${this.apiUrl}/estadisticas-all`);
  }

  getCartaUsuarios(isUsuario: number): Observable<CartaUsuarioDTO> {
    return this.http.get<CartaUsuarioDTO>(`${this.apiUrl}/carta-usuario/${isUsuario}`);
  }

}
