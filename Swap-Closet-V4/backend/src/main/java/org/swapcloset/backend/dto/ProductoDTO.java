package org.swapcloset.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Null;
import lombok.*;
import java.util.List;

@Data
public class ProductoDTO {
    private Integer id;
    @NotBlank(message = "El tipo no puede estar vacío")
    @NotNull(message = "El tipo no puede ser nulo")
    private String tipo;
    private String precio;
    @NotBlank(message = "El título no puede estar vacío")
    @NotNull(message = "El título no puede ser nulo")
    private String titulo;
    @NotNull(message = "El estilo no puede ser nulo")
    @NotBlank(message = "El estilo no puede estar vacío")
    private String estilo;
    @NotNull(message = "La descripción no puede ser nula")
    @NotBlank(message = "La descripción no puede estar vacía")
    private String descripcion;
    @NotNull(message = "La marca no puede ser nula")
    @NotBlank(message = "La marca no puede estar vacía")
    private String marca;
    @NotBlank(message = "El estado no puede estar vacío")
    @NotNull(message = "El estado no puede ser nulo")
    private String estado;
    @NotBlank(message = "La categoría no puede estar vacía")
    @NotNull(message = "La categoría no puede ser nula")
    private String categoria;
    @NotNull(message = "La talla no puede ser nula")
    @NotBlank(message = "La talla no puede estar vacía")
    private String talla;
    @NotNull(message = "El color no puede ser nulo")
    @NotBlank(message = "El color no puede estar vacío")
    private String color;
    @NotNull(message = "La fecha de devolución no puede ser nula")
    @NotBlank(message = "La fecha de devolución no puede no puede estar vacía")
    private String fechaDevolucion;
    private String fechaCreacion;
    @NotNull(message = "El idUsuario no puede ser nulo")
    private Integer idUsuario;
    private Boolean activo;

    private List<ImagenProductoDTO> imagenes;
    //private List<FavoritoDTO> favoritos;
    //private List<ChatDTO> chatsProducto1;
    //private List<ChatDTO> chatsProducto2;

}
