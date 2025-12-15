import { Injectable } from '@angular/core';
import {ImagenProductoDTO} from "../../modelos/ImagenProductoDTO";

@Injectable({
  providedIn: 'root'
})
export class ImagenFormService {

  imagenesDisponibles: string[] = [
    'assets/img/productos/camisa.jpg',
    'assets/img/productos/chaqueta-marron.JPG',
    'assets/img/productos/chaqueta-verde.JPG',
    'assets/img/productos/chupa-cuero.png',
    'assets/img/productos/gorra.jpg',
    'assets/img/productos/pantalones-azules.png',
    'assets/img/productos/sudadera-negra.JPG',
    'assets/img/productos/vestido-verde.jpg',
    'assets/img/productos/zapatos-nike.png',
  ];

  getListaImagenes(): string[] {
    return this.imagenesDisponibles;
  }

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
