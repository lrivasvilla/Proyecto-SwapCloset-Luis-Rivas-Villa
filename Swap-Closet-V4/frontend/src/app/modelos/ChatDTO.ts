import {MensajeDTO} from "./MensajeDTO";

export interface ChatDTO {

  id?: number;
  usuario1Id?: number;
  usuario2Id?: number;
  producto1Id?: number;
  producto2Id?: number;
  fechaQuedada?: string; // LocalDateTime a string
  fechaDevolucion?: string; // LocalDateTime a string
  activo?: boolean;
  ubicacion?: string;

  mensajes?: MensajeDTO[];
}
