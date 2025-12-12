package org.swapcloset.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.List;

@Data
public class UsuarioDTO {
    private Integer id;
    @NotNull(message = "El nombre ni puede ser nulo")
    @NotBlank(message = "El nombre no puede estar vacío")
    private String nombre;
    @NotNull(message = "Los apellidos no pueden ser nulos")
    @NotBlank(message = "Los apellidos no pueden estar vacíos")
    private String apellidos;
    @Email(message = "El email no es válido")
    private String email;
    @NotNull(message = "La contraseña no puede ser nula")
    @NotBlank(message = "La contraseña no puede estar vacía")
    private String password;
    private String descripcion;
    private String estilo;
    private String urlImg;
    private String direccion;
    @JsonProperty("tCamiseta")
    private String tCamiseta;
    @JsonProperty("tPantalon")
    private Integer tPantalon;
    @JsonProperty("tCalzado")
    private Integer tCalzado;

    private List<ProductoDTO> productos;
}
