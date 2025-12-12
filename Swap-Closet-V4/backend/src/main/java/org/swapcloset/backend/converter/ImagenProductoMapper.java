package org.swapcloset.backend.converter;

import org.mapstruct.*;
import org.mapstruct.factory.Mappers;
import org.swapcloset.backend.dto.ImagenProductoDTO;
import org.swapcloset.backend.dto.ProductoDTO;
import org.swapcloset.backend.modelos.ImagenProducto;
import org.swapcloset.backend.modelos.Producto;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ImagenProductoMapper {

    // De entidad a DTO: mapear producto.id -> idProducto
    @Mapping(target = "idProducto", expression = "java(imagenProducto.getProducto() != null ? imagenProducto.getProducto().getId() : null)")
    ImagenProductoDTO toDTO(ImagenProducto imagenProducto);

    // De DTO a entidad: no mapear la relación producto (la asignas en el servicio)

    ImagenProducto toEntity(ImagenProductoDTO imagenProductoDTO);

    List<ImagenProductoDTO> toDTOsList(List<ImagenProducto> imagenes);

    List<ImagenProducto> toEntitysList(List<ImagenProductoDTO> imagenProductoDTOS);

    // Para update: no tocar la relación producto y no sobrescribir propiedades nulas
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "producto", ignore = true)
    void updateEntityFromDTO(ImagenProductoDTO dto, @MappingTarget ImagenProducto entidad);
}