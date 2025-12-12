import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {UsuarioDTO} from "../../modelos/UsuarioDTO";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // BehaviorSubject mantiene el estado actual y permite suscribirse a cambios
  private usuarioActualSubject = new BehaviorSubject<UsuarioDTO | null>(null);
  usuarioActual$ = this.usuarioActualSubject.asObservable();

  constructor() { }

  // Guardar usuario logueado
  setUsuario(usuario: UsuarioDTO) {
    this.usuarioActualSubject.next(usuario);
    // Opcional: guardar en localStorage para persistencia
    localStorage.setItem('usuarioActual', JSON.stringify(usuario));
  }

  // Obtener usuario logueado
  getUsuario(): UsuarioDTO | null {
    return this.usuarioActualSubject.value;
  }

  // Cargar usuario desde localStorage al iniciar la app
  cargarUsuarioSesion() {
    const usuario = localStorage.getItem('usuarioActual');
    if (usuario) {
      this.usuarioActualSubject.next(JSON.parse(usuario));
    }
  }

  // Cerrar sesión
  logout() {
    this.usuarioActualSubject.next(null);
    localStorage.removeItem('usuarioActual');
  }
}
