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
    return this.http.post<ImagenProductoDTO>(this.apiUrl, imagenProductoDTO);
  }

}
