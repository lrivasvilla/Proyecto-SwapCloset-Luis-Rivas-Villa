import { Injectable } from '@angular/core';
import {ImagenProductoDTO} from "../../modelos/ImagenProductoDTO";

@Injectable({
  providedIn: 'root'
})
export class ImagenFormService {


  public fotosSeleccionadas: string[] = []; // Se mantiene pública para el acceso desde componentes (SubirFotoComponent)

  agregarFoto(enlace : string) {
    this.fotosSeleccionadas.push(enlace);
    console.log('Foto agregada:', enlace);
  }

  getFotos(): string[] {
    return this.fotosSeleccionadas;
  }

  resetFotos() {
    this.fotosSeleccionadas = [];
    console.log('Fotos reseteadas en ImagenFormService.');
  }

  generarImagenesDTO(idProducto: number): ImagenProductoDTO[] {
    return this.fotosSeleccionadas.map((ruta, index) => ({
      urlImg: ruta,
      orden: index + 1,
      idProducto: idProducto
    }));
  }
}
