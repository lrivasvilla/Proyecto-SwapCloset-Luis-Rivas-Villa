import {Component, effect, EventEmitter, inject, Input, OnInit, Output, signal, ViewChild} from '@angular/core';
import {ActionSheetButton, ActionSheetController, IonicModule, IonModal, ModalController} from "@ionic/angular";
import {DatePipe, LowerCasePipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {ModalFotosComponent} from "../../c-publicar/subir-foto/modal-fotos/modal-fotos.component";
import {ImagenProductoService} from "../../../service/imagenProductoService/imagen-producto.service";
import {ImagenProductoDTO} from "../../../modelos/ImagenProductoDTO";

@Component({
  selector: 'app-anuncio-intercambio',
  templateUrl: './anuncio-intercambio.component.html',
  styleUrls: ['./anuncio-intercambio.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    NgForOf,
    RouterLink,
    FormsModule,
    NgClass,
    NgIf,
    LowerCasePipe,
    DatePipe
  ]
})
export class AnuncioIntercambioComponent {

  @Input() producto!: any;
  @Input() usuario!: any;
  @Input() primeraImagen: string = '';
  @Input() idUsuarioLogueado!: number | null;

  @Output() guardar = new EventEmitter<any>();
  @Output() cancelar = new EventEmitter<void>();

  estilosSeleccionados: string[] = [];
  estilosExtra = ['Vintage', 'Boho', 'Elegante', 'Minimal', 'Sport'];

  tallasDisponibles = ['XS','S','M','L','XL'];
  estadosDisponibles = ['Nuevo','Como nuevo','Bueno','Aceptable'];
  coloresDisponibles = ['Negro','Blanco','Rojo','Azul'];
  categoriasDisponibles = ['Vestido', 'Top', 'Pantalón', 'Chaqueta', 'Calzado', 'Accesorios', 'Abrigo', 'Falda', 'Sudadera', 'Camisa', 'Jersey'];

  // Nueva propiedad para almacenar la ruta de la imagen seleccionada del modal
  nuevaRutaImagen: string | null = null;

  @ViewChild('modalFecha', { static: false }) modalFecha!: IonModal;

  // Inyectamos el ModalController usando inject()
  private actionSheetCtrl = inject(ActionSheetController);
  private modalCtrl = inject(ModalController);
  private imagenProductoService = inject(ImagenProductoService)

  constructor() {
    effect(() => {
      const p = this.producto;
      if (!p?.estilo) return;

      this.estilosSeleccionados = p.estilo
        .split(',')
        .map((e: string) => e.trim())
        .filter((e: string) => e.length > 0);
    });
  }

  async cambiarFoto() {
    const modal = await this.modalCtrl.create({
      component: ModalFotosComponent,
      cssClass: 'modal-galeria'
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();

    if (!data?.ruta || !this.producto?.id) return;

    const ruta = data.ruta;

    // 1. UI inmediata
    this.primeraImagen = ruta;

    // 2. Guardar para backend
    this.nuevaRutaImagen = ruta;

  }

  guardarCambios() {
    // Guardar o actualizar estilos
    if (this.estilosSeleccionados.length > 0) {
      this.producto.estilo = this.estilosSeleccionados.join(', ');
    } else {
      this.producto.estilo = null;
    }

    // Si hay una nueva imagen seleccionada, se asigna
    if (this.nuevaRutaImagen) {
      const idImagenProducto = 14;

      const dto: ImagenProductoDTO = {
        id: idImagenProducto,
        urlImg: this.nuevaRutaImagen,
        orden: 1,
        idProducto: this.producto.id
      };

      console.log("************dto: " + JSON.stringify(dto));

      this.imagenProductoService.updateImagenProducto(idImagenProducto, dto)
        .subscribe({
          next: () => {
            console.log('Imagen principal actualizada correctamente');
            this.guardar.emit(this.producto);
          },
          error: err => console.error(err)
        });
    }
  }

  cancelarEdicion() {
    this.cancelar.emit();
  }

  // --- ESTILOS ---
  // ... (restantes métodos agregarEstilo, eliminarEstilo, seleccionarTalla, seleccionarEstado, etc.)
  async agregarEstilo() {
    const botones: ActionSheetButton[] = this.estilosExtra.map(est => ({
      text: est,
      handler: () => {
        if (!this.estilosSeleccionados.includes(est)) {
          this.estilosSeleccionados.push(est);
        }
      }
    }));
    botones.push({ text: 'Cancelar', role: 'cancel' });

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Añadir estilo',
      buttons: botones
    });
    await actionSheet.present();
  }

  eliminarEstilo(est: string) {
    this.estilosSeleccionados = this.estilosSeleccionados.filter(e => e !== est);
  }


  async seleccionarTalla() {
    const botones: ActionSheetButton[] = this.tallasDisponibles.map(talla => ({
      text: talla,
      handler: () => { this.producto.talla = talla; }
    }));
    botones.push({ text: 'Cancelar', role: 'cancel' });

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Selecciona talla',
      buttons: botones
    });
    await actionSheet.present();
  }

  async seleccionarEstado() {
    const botones: ActionSheetButton[] = this.estadosDisponibles.map(estado => ({
      text: estado,
      handler: () => { this.producto.estado = estado; }
    }));
    botones.push({ text: 'Cancelar', role: 'cancel' });

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Selecciona estado',
      buttons: botones
    });
    await actionSheet.present();
  }

  async seleccionarColor() {
    const botones: ActionSheetButton[] = this.coloresDisponibles.map(color => ({
      text: color,
      handler: () => { this.producto.color = color; }
    }));
    botones.push({ text: 'Cancelar', role: 'cancel' });

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Selecciona color',
      buttons: botones
    });
    await actionSheet.present();
  }

  async seleccionarCategoria() {
    const botones: ActionSheetButton[] = this.categoriasDisponibles.map(cat => ({
      text: cat,
      handler: () => {
        this.producto.categoria = cat;
      }
    }));

    botones.push({ text: 'Cancelar', role: 'cancel' });

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Selecciona Categoría',
      buttons: botones
    });
    await actionSheet.present();
  }

  // --- MODAL DE FECHA ---
  abrirFechaModal() {
    this.modalFecha.present();
  }

  cerrarFechaModal() {
    this.modalFecha.dismiss();
  }

  async seleccionarTipoOferta() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Selecciona el Tipo de Oferta',
      buttons: [
        {
          text: 'Intercambio',
          role: 'intercambio',
          cssClass: this.producto.tipo === 'Intercambio' ? 'selected-option' : '',
          handler: () => {
            this.producto.tipo = 'intercambio';
            // Al cambiar a Intercambio, limpiamos el precio
            this.producto.precio = null;
          }
        },
        {
          text: 'Préstamo',
          role: 'prestamo',
          // El chip será azul
          cssClass: this.producto.tipo === 'Préstamo' ? 'selected-option' : '',
          handler: () => {
            this.producto.tipo = 'prestamo';
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }
}
