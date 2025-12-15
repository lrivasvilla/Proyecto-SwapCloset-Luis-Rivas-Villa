package org.swapcloset.backend.converter;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.ReportingPolicy;
import org.swapcloset.backend.dto.ChatDTO;
import org.swapcloset.backend.modelos.Chat;
import org.swapcloset.backend.modelos.TipoEstadoIntercambio;
import org.swapcloset.backend.modelos.TipoProducto;


import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;

@Mapper(componentModel = "spring")
public interface ChatMapper {

    DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("dd/MM/yyyy");
    @Mapping(source = "usuario1.id", target = "usuario1Id")
    @Mapping(source = "usuario2.id", target = "usuario2Id")
    @Mapping(source = "producto1.id", target = "producto1Id")
    @Mapping(source = "producto2.id", target = "producto2Id")
    @Mapping(source = "fechaCreacion", target = "fechaCreacion", qualifiedByName = "formatDateTime")
    @Mapping(source = "fechaQuedada", target = "fechaQuedada", qualifiedByName = "formatDateTime")
    @Mapping(source = "fechaDevolucion", target = "fechaDevolucion", qualifiedByName = "formatDateTime")
    @Mapping(source = "estadoIntercambio", target = "estadoIntercambio", qualifiedByName = "tipoEstadoIntercambioToString")
    ChatDTO toDTO(Chat chat);

    Chat toEntity(ChatDTO chatDTO);

    List<ChatDTO> toDTOList(List<Chat> chats);

    List<Chat> toEntityList(List<ChatDTO> chatDTOS);

    @Named("formatDateTime")
    default String formatDateTime(LocalDateTime dt) {
        return dt == null ? null : dt.format(FORMATTER);
    }


    @Named("tipoEstadoIntercambioToString")
    default String tipoEstadoIntercambioToString(TipoEstadoIntercambio estado) {
        return estado != null ? estado.name() : null;
    }


}
