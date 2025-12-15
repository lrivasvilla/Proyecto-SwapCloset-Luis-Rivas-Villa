import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, firstValueFrom, Observable, of, shareReplay} from "rxjs";
import {ImagenProductoDTO} from "../../modelos/ImagenProductoDTO";
import {UsuarioDTO} from "../../modelos/UsuarioDTO";

@Injectable({
  providedIn: 'root'
})
export class ImagenProductoService {

  private http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/api/imagenes-producto';

  getImagenProducto(id: number): Observable<ImagenProductoDTO> {
    return this.http.get<ImagenProductoDTO>(`${this.apiUrl}/${id}`);
  }

  guardarImagenProducto(imagenProductoDTO: ImagenProductoDTO){
    return this.http.post<ImagenProductoDTO>(`${this.apiUrl}/create`, imagenProductoDTO);
  }

  updateImagenProducto(id: number, dto: ImagenProductoDTO): Observable<ImagenProductoDTO> {
    return this.http.put<ImagenProductoDTO>(`${this.apiUrl}/update/${id}`, dto);
  }

  getImagenPrincipal(id: number): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/img-principal/${id}`);
  }

  actualizarImagenPrincipal(idProducto: number, ruta: string) {
    return this.http.put(`${this.apiUrl}/principal`, {idProducto, ruta});
  }
}
