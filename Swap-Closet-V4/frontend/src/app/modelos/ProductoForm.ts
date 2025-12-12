import {ImagenProductoDTO} from "./ImagenProductoDTO";

export interface ProductoForm {

  tipoOferta: 'intercambio' | 'prestamo'; // Tipo de oferta
  precio?: number | null;                 // Solo si es préstamo
  titulo?: string;
  estilo?: string;
  descripcion?: string;
  marca?: string;
  estado?: string;
  categoria?: string;
  talla?: string;
  color?: string;
  fechaDevolucion?: string;

  imagenes?: ImagenProductoDTO[];
}
