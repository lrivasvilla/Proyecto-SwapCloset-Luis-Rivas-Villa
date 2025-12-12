export interface ProductoHistoricoDTO {

  id?: number;
  idProducto?: number;
  idUsuario?: number;
  tipo?: string; // TipoProducto a string
  accion?: string; // AccionHistorico a string
  titulo?: string;
  estilo?: string;
  descripcion?: string;
  marca?: string;
  categoria?: string;
  talla?: string;
  color?: string;
  precio?: number; // BigDecimal a number
  fechaDevolucion?: string; // LocalDateTime a string
  fechaCreacion?: string; // LocalDateTime a string

}
