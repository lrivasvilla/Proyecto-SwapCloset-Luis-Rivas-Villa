import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {FavoritoDTO} from "../../modelos/FavoritoDTO";
import {ProductoDTO} from "../../modelos/ProductoDTO";
import {CartaProductoDTO} from "../../modelos/CartaProductoDTO";

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {
  private http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/api/favoritos';

  getFavorito(id: number): Observable<FavoritoDTO> {
    return this.http.get<FavoritoDTO>(`${this.apiUrl}/${id}`)
  }

  getFavoritosByUsuario(idUsuario: number): Observable<ProductoDTO[]> {
    return this.http.get<ProductoDTO[]>(`${this.apiUrl}/usuario/${idUsuario}/productos`);
  }

  getCartProductoFavoritosByUsuario(idUsuario: number): Observable<CartaProductoDTO[]> {
    return this.http.get<CartaProductoDTO[]>(`${this.apiUrl}carta-productos-favoritos/${idUsuario}`);
  }

  getCountFavoritos(idUsuario: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/usuario/${idUsuario}/count`);
  }

}
