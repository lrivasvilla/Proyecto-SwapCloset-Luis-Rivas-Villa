import { Injectable } from '@angular/core';
import {ProductoForm} from "../../modelos/ProductoForm";
import {ProductoDTO} from "../../modelos/ProductoDTO";

@Injectable({
  providedIn: 'root'
})
export class ProductoFormService {

  private form: ProductoForm = {
    tipoOferta: 'intercambio',
    precio: null,
    fechaDevolucion: "",
    titulo: '',
    marca: '',
    descripcion: '',
    categoria: '',
    estado: '',
    talla: '',
    color: '',
    estilo: ''
  };

  getForm(): ProductoForm {
    return this.form;
  }

  updateForm(changes: Partial<ProductoForm>) {
    this.form = { ...this.form, ...changes };
    console.log('Formulario actualizado:', this.form);
  }

  resetForm() {
    this.form = {
      tipoOferta: 'intercambio',
      precio: null,
      fechaDevolucion: "",
      titulo: '',
      marca: '',
      descripcion: '',
      categoria: '',
      estado: '',
      talla: '',
      color: '',
      estilo: ''
    };
    console.log('Formulario reseteado.');
  }

  convertirAProductoDTO(idUsuario: number): ProductoDTO {
    const fechaSolo = this.form.fechaDevolucion && this.form.fechaDevolucion.includes("T")
      ? this.form.fechaDevolucion.split("T")[0]
      : this.form.fechaDevolucion ?? undefined;

    return {
      tipo: this.form.tipoOferta ?? '',
      precio: this.form.precio?.toString() ?? '',
      titulo: this.form.titulo ?? '',
      estilo: this.form.estilo ?? '',
      descripcion: this.form.descripcion ?? '',
      marca: this.form.marca ?? '',
      estado: this.form.estado ?? '',
      categoria: this.form.categoria ?? '',
      talla: this.form.talla ?? '',
      color: this.form.color ?? '',
      fechaDevolucion: fechaSolo,
      idUsuario: idUsuario,
      activo: true,
      fechaCreacion: undefined,
      imagenes: undefined,
      favoritos: undefined,
      chatProducto1: undefined,
      chatsProducto2: undefined
    };
  }
}
