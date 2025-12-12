package org.swapcloset.backend.modelos;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@ToString
@Entity
@Table(name = "seguidor")
public class Seguidor {

    @EmbeddedId
    private SeguidoresId id;

    @MapsId("idSeguidor")
    @ManyToOne
    @JoinColumn(name = "id_seguidor")
    private Usuario seguidor;

    @MapsId("idSeguido")
    @ManyToOne
    @JoinColumn(name = "id_seguido")
    private Usuario seguido;
}
