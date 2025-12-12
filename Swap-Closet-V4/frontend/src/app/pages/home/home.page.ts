import {Component, inject, OnInit, signal} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {animate, style, transition, trigger} from "@angular/animations";
import {CartaHomePrestamoComponent} from "../../components/c-home/carta-home-prestamo/carta-home-prestamo.component";
import {
  CartaHomeIntercambioComponent
} from "../../components/c-home/carta-home-intercambio/carta-home-intercambio.component";
import {
  DatosAdicionalesChipComponent
} from "../../components/c-publicar/datos-adicionales-chip/datos-adicionales-chip.component";
import {RouterLink, RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {ProductoService} from "../../service/productoService/producto.service";
import {ProductoDTO} from "../../modelos/ProductoDTO";
import {CartaProductoDTO} from "../../modelos/CartaProductoDTO";

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [
    IonicModule,
    CommonModule,
    CartaHomeIntercambioComponent,
    DatosAdicionalesChipComponent,
    RouterModule,
    RouterLink
  ],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ height: 0, opacity: 0, transform: 'translateY(-10px)' }),
        animate('250ms ease-out', style({ height: '*', opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ height: 0, opacity: 0, transform: 'translateY(-10px)' }))
      ])
    ])
  ]
})

export class HomePage implements OnInit {

  mostrarMenu = false;

  private productoService = inject(ProductoService);

  productos = signal<CartaProductoDTO[]>([]);

  ngOnInit() {
    this.cargarProductos();
  }

  cargarProductos() {
    this.productoService.getAllCartasProductosActivos().subscribe({
      next: (prods) => {
        // set de productos y prefetch de imagen principal por producto
        this.productos.set(prods);
      },
      error: (err) => console.error('Error:', err)
    });
  }
  toggleMenu() { this.mostrarMenu = !this.mostrarMenu; }

}
