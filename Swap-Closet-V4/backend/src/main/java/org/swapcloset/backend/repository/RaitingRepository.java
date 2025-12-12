package org.swapcloset.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.swapcloset.backend.modelos.Raiting;
import org.swapcloset.backend.modelos.RaitingId;

import java.util.List;
import java.util.Optional;
@Repository
public interface RaitingRepository extends JpaRepository<Raiting, RaitingId> {

    // Todos los ratings recibidos por un usuario
    List<Raiting> findByPuntuado_Id(Integer idPuntuado);

    // Todos los ratings hechos por un usuario
    List<Raiting> findByPuntuador_Id(Integer idPuntuador);

    @Query("SELECT AVG(r.puntuacion) FROM Raiting r WHERE r.puntuado.id = :idUsuario")
    Double findAveragePuntuacionByPuntuadoId(@Param("idUsuario") Integer idUsuario);

    // Rating entre dos usuarios (si existe)
    Optional<Raiting> findByPuntuado_IdAndPuntuador_Id(Integer idPuntuado, Integer idPuntuador);

    // Comprobar existencia de rating entre dos usuarios
    boolean existsByPuntuado_IdAndPuntuador_Id(Integer idPuntuado, Integer idPuntuador);

    // Conteo de ratings recibidos por un usuario
    long countByPuntuado_Id(Integer idPuntuado);

    // Borrar ratings por usuario puntuado/puntuador
    void deleteByPuntuado_Id(Integer idPuntuado);
    void deleteByPuntuador_Id(Integer idPuntuador);

    // Top N ratings (ejemplo: usar .subList en servicio o cambiar a findTop5...)
    List<Raiting> findTop5ByPuntuado_IdOrderByPuntuacionDesc(Integer idPuntuado);

}