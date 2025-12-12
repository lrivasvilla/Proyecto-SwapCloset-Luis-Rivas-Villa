package org.swapcloset.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class ChatDTO {
    private Integer id;
    @NotNull(message = "El ID del usuario 1 es obligatorio")
    private Integer usuario1Id;
    @NotNull(message = "El ID del usuario 2 es obligatorio")
    private Integer usuario2Id;
    @NotNull(message = "El ID del producto 1 es obligatorio")
    private Integer producto1Id;
    private Integer producto2Id;
    private String fechaCreacion;
    private String fechaQuedada;
    private String fechaDevolucion;
    private Boolean activo;
    private String ubicacion;
    private Boolean completado;
    private String estadoIntercambio;

    private List<MensajeDTO> mensajes;
}