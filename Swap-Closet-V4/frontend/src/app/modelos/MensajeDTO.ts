export interface MensajeDTO {

  id?: number;
  idChat?: number;
  contenido?: string;
  fechaEnvio?: string; // LocalDateTime a string
  leido?: boolean;

}
