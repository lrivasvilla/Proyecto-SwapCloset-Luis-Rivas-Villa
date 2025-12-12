package org.swapcloset.backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.swapcloset.backend.modelos.Chat;
import org.swapcloset.backend.modelos.Mensaje;

import java.util.List;
import java.util.Optional;

@Repository
public interface MensajeRepository extends JpaRepository<Mensaje, Integer> {

    // Todos los mensajes de un chat ordenados ascendente por fecha
    List<Mensaje> findByChat_IdOrderByFechaEnvioAsc(Integer chatId);

    // Mensajes de un chat con paginación y orden descendente por fecha
    Page<Mensaje> findByChat_IdOrderByFechaEnvioDesc(Integer chatId, Pageable pageable);

    // Último mensaje enviado en un chat
    Optional<Mensaje> findTopByChat_IdOrderByFechaEnvioDesc(Integer chatId);

    // Mensajes no leídos de un chat (por entidad Chat)
    List<Mensaje> findByChatAndLeidoFalse(Chat chat);

    // Conteo de mensajes no leídos por id de chat
    long countByChat_IdAndLeidoFalse(Integer chatId);

    // Eliminar todos los mensajes de un chat
    void deleteByChat_Id(Integer chatId);

    // Búsqueda por fragmento de contenido (ignora mayúsculas/minúsculas)
    List<Mensaje> findByContenidoContainingIgnoreCase(String fragment);
}