package org.swapcloset.backend.dto;

import lombok.Data;

@Data
public class CartaProductoIntercambioDTO {

    //Producto
    private Integer id;
    private String tipo;
    private String precio;
    private String titulo;
    private String estilo;
    private String descripcion;
    private String marca;
    private String estado;
    private String categoria;
    private String talla;
    private String color;
    private String fechaDevolucion;
    private String fechaCreacion;
    private Integer idUsuario;
    private Boolean activo;

    private Integer intercambios;

}
