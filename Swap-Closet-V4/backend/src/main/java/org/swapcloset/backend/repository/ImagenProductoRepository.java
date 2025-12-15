package org.swapcloset.backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.swapcloset.backend.modelos.ImagenProducto;

import java.util.List;
import java.util.Optional;
@Repository
public interface ImagenProductoRepository extends JpaRepository<ImagenProducto, Integer> {
    // Todas las imágenes de un producto
    List<ImagenProducto> findByProducto_Id(Integer productoId);

    @Query(value = "SELECT ip.url_img FROM imagen_producto ip WHERE ip.id_producto = :productoId ORDER BY ip.orden ASC LIMIT 1", nativeQuery = true)
    String getPrimeraImagen(Integer productoId);

    // Con paginación
    Page<ImagenProducto> findByProducto_Id(Integer productoId, Pageable pageable);

    // Ordenadas por el campo 'orden'
    List<ImagenProducto> findByProducto_IdOrderByOrdenAsc(Integer productoId);

    // Primera imagen (más baja en 'orden') de un producto
    Optional<ImagenProducto> findTopByProducto_IdOrderByOrdenAsc(Integer productoId);

    // Buscar imagen concreta por producto y orden
    Optional<ImagenProducto> findByProducto_IdAndOrden(Integer productoId, Integer orden);

    // Comprobar existencia de un orden para un producto
    boolean existsByProducto_IdAndOrden(Integer productoId, Integer orden);

    // Eliminar todas las imágenes de un producto
    void deleteByProducto_Id(Integer productoId);

    // Buscar por fragmento de URL
    List<ImagenProducto> findByUrlImgContainingIgnoreCase(String fragment);

    Optional<ImagenProducto> findByProductoIdAndOrden(Integer productoId, Integer orden);

}
