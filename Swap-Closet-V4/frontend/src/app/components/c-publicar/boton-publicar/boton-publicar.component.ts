import {Component, inject, OnInit} from '@angular/core';
import {IonicModule, ToastController} from "@ionic/angular";
import {ProductoService} from "../../../service/productoService/producto.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../service/authService/auth.service";
import {CommonModule} from "@angular/common";
import {ImagenProductoDTO} from "../../../modelos/ImagenProductoDTO";
import {ImagenProductoService} from "../../../service/imagenProductoService/imagen-producto.service";
import {ProductoDTO} from "../../../modelos/ProductoDTO";
import {ProductoFormService} from "../../../service/productoFormService/producto-form.service";
import {firstValueFrom} from "rxjs";
import {ImagenFormService} from "../../../service/imagenFormService/imagen-form.service";

@Component({
  selector: 'app-boton-publicar',
  templateUrl: './boton-publicar.component.html',
  styleUrls: ['./boton-publicar.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule
  ]
})
export class BotonPublicarComponent implements OnInit {

  private formService = inject(ProductoFormService);
  private productoService = inject(ProductoService);
  private imagenService = inject(ImagenProductoService);
  private imagenesFormService = inject(ImagenFormService);
  private toastCtrl = inject(ToastController);
  private router = inject(Router);
  private authService = inject(AuthService);

  constructor() {}

  ngOnInit() {}

  /**
   * Proceso principal para validar el formulario, guardar el producto y luego sus imágenes.
   */
  async publicarPrenda() {
    const form = this.formService.getForm();

    try {
      // 1) Validaciones básicas
      if (!form.titulo || !form.tipoOferta || !form.categoria) {
        return this.mostrarToast('Debes completar título, oferta y categoría');
      }

      // 2) Validación específica de préstamos
      if (form.tipoOferta === 'prestamo') {
        if (form.precio == null || form.precio === undefined) {
          return this.mostrarToast('Precio y fecha de devolución obligatorios');
        }
      }

      // 3) Obtener usuario
      const usuario = this.authService.getUsuario();
      if (!usuario?.id) {
        await this.mostrarToast('Debes iniciar sesión');
        return this.router.navigate(['/login']);
      }

      // 4) Construir DTO del producto
      const productoDTO = this.formService.convertirAProductoDTO(usuario.id);


      // 5) Guardar el producto en el backend
      const productoCreado = await firstValueFrom(
        this.productoService.guardarProducto(productoDTO)
      );

      if (!productoCreado?.id) {
        throw new Error('El backend no devolvió un ID de producto');
      }

      //6) Guardar imágenes del producto (solo rutas)
      await this.guardarImagenes(productoCreado.id);

      // 7) Final
      await this.mostrarToast('Producto publicado correctamente');
      this.formService.resetForm();
      this.router.navigate(['/home']);

    } catch (err) {
      console.error('Error durante la publicación del producto:', err);
      this.mostrarToast('Error al publicar el producto');
    }
  }


  /**
   * Convierte las URLs de las fotos a DTOs y las guarda usando el ID del producto.
   */
  async guardarImagenes(idProducto: number) {
    // 1. Obtener las URLs desde el servicio dedicado a las imágenes
    const fotosUrls: string[] = this.imagenesFormService.getFotos();

    if (!fotosUrls || fotosUrls.length === 0) return;

    try {
      // 2. Iterar sobre las URLs y guardar cada DTO
      for (let i = 0; i < fotosUrls.length; i++) {

        const dto: ImagenProductoDTO = {
          urlImg: fotosUrls[i],   // URL o ruta completa de la imagen
          orden: i + 1,           // El orden es el índice + 1
          idProducto: idProducto  // ID del producto recién creado
        };

        // 3. Llamada al servicio HTTP para guardar la imagen
        // Nota: Si el servicio devuelve un Observable, 'firstValueFrom' espera la respuesta.
        await firstValueFrom(
          this.imagenService.guardarImagenProducto(dto)
        );
      }

      // 4. Limpiar el array de fotos en el servicio de imágenes después del guardado exitoso
      this.imagenesFormService.resetFotos();
      // Opcional: this.imagenesFormService.fotosSeleccionadas = [];

    } catch (error) {
      console.error("Error al guardar una imagen asociada:", error);
      // Propagar el error para que el 'catch' de publicarPrenda lo gestione
      throw new Error('Fallo al guardar una o más imágenes.');
    }
  }

  private async mostrarToast(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();
  }
}
