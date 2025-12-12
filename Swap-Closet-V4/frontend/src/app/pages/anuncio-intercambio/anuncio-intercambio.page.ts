import {Component, inject, OnInit, signal} from '@angular/core';
import {ActionSheetController, AlertController, IonicModule} from "@ionic/angular";
import {BtnContactarComponent} from "../../components/c-anuncio/btn-contactar/btn-contactar.component";
import {ActivatedRoute, Router, RouterModule} from "@angular/router";
import {ProductoDTO} from "../../modelos/ProductoDTO";
import {ProductoService} from "../../service/productoService/producto.service";
import {UsuarioService} from "../../service/usuarioService/usuario.service";
import {Location, NgIf} from '@angular/common';
import {AuthService} from "../../service/authService/auth.service";
import {CartaUsuarioDTO} from "../../modelos/CartaUsuarioDTO";
import {AnuncioComponenteComponent} from "../../components/c-anuncio/anuncio-componente/anuncio-componente.component";
import {ProductoForm} from "../../modelos/ProductoForm";
import {RaitingService} from "../../service/raitingService/raiting.service";
import {ProductoFormService} from "../../service/productoFormService/producto-form.service";

@Component({
  selector: 'app-anuncio-intercambio',
  templateUrl: './anuncio-intercambio.page.html',
  styleUrls: ['./anuncio-intercambio.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    BtnContactarComponent,
    RouterModule,
    AnuncioComponenteComponent,
    NgIf,
  ]
})
export class AnuncioIntercambioPage implements OnInit {

  idProducto!: string;

  private route = inject(ActivatedRoute);
  private productoService = inject(ProductoService);
  private usuarioService = inject(UsuarioService);
  private authService = inject(AuthService);
  private actionSheetCtrl = inject(ActionSheetController);
  private alertCtrl = inject(AlertController);
  private router = inject(Router);

  idUsuarioLogueado = this.authService.getUsuario()?.id;

  producto = signal<ProductoDTO | null>(null);
  usuario = signal<CartaUsuarioDTO | null>(null);
  estilos = signal<string[]>([]);
  modoEdicion = signal<boolean>(false);

  constructor(private location: Location) {}

  ngOnInit() {
    this.idProducto = this.route.snapshot.paramMap.get('id')!;
    this.cargarProducto(this.idProducto);
  }

  private cargarProducto(id: string) {
    this.productoService.getProducto(Number(id)).subscribe({
      next: (prod) => {
        if (prod) {
          this.producto.set(prod);
          const listaEstilos = prod.estilo ? prod.estilo.split(',') : [];
          this.estilos.set(listaEstilos.map(e => e.trim()));

          if (prod.idUsuario) {
            this.usuarioService.getCartaUsuarios(prod.idUsuario)
              .subscribe(u => this.usuario.set(u));
          }
        } else {
          this.producto.set(null);
        }
      },
      error: () => {
        this.producto.set(null);
      }
    });
  }

  getPrimeraImagen(): string {
    const imagen = this.producto()?.imagenes?.[0]?.urlImg;
    return imagen || 'https://ionicframework.com/docs/img/demos/card-media.png';
  }

  volver() {
    this.location.back();
  }

  async mostrarOpciones() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Opciones del Anuncio',
      buttons: [
        {
          text: 'Editar',
          icon: 'create-outline',
          handler: () => this.modoEdicion.set(true)
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          icon: 'trash-outline',
          handler: () => this.confirmarEliminacion()
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }

  async confirmarEliminacion() {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar Eliminación',
      message: '¿Seguro que deseas eliminar este anuncio?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { text: 'Eliminar', handler: () => this.eliminarAnuncio() }
      ]
    });

    await alert.present();
  }

  eliminarAnuncio() {
    const id = this.producto()?.id;
    if (id) {
      this.productoService.eliminarProducto(id).subscribe(() => {
        this.router.navigate(['/home']);
      });
    }
  }

  guardarCambios(productoActualizado: ProductoDTO) {
    const id = productoActualizado.id;

    if (!id) {
      console.error("El producto no tiene ID, no se puede actualizar");
      return;
    }

    this.productoService.updateProducto(id, productoActualizado).subscribe({
      next: () => {
        this.modoEdicion.set(false);
        this.producto.set(productoActualizado);
      },
      error: (err) => console.error("Error al guardar:", err)
    });
  }
}
