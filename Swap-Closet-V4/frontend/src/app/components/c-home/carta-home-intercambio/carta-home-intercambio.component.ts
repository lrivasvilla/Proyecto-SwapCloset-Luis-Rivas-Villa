import {Component, inject, Input, input, OnChanges, OnInit} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {ProductoDTO} from "../../../modelos/ProductoDTO";
import {RouterLink, RouterModule} from "@angular/router";
import {UsuarioDTO} from "../../../modelos/UsuarioDTO";
import {UsuarioService} from "../../../service/usuarioService/usuario.service";
import {Observable} from "rxjs";
import {AsyncPipe, DatePipe, NgClass, NgIf, TitleCasePipe} from "@angular/common";
import {RaitingService} from "../../../service/raitingService/raiting.service";
import {CartaProductoDTO} from "../../../modelos/CartaProductoDTO";

@Component({
  selector: 'app-carta-home-intercambio',
  templateUrl: './carta-home-intercambio.component.html',
  styleUrls: ['./carta-home-intercambio.component.scss'],
  standalone: true,
  imports: [
    IonicModule, RouterModule, AsyncPipe, NgClass, NgIf, TitleCasePipe, DatePipe
  ]
})
export class CartaHomeIntercambioComponent {

  producto = input.required<CartaProductoDTO>();
  esFavorito = false;

  toggleFavorito() {
    this.esFavorito = !this.esFavorito;

    // Aquí llamas al backend si quieres guardar el favorito
    // this.productoService.toggleFavorito(this.producto()?.id, this.esFavorito);

    console.log('Favorito:', this.esFavorito);
  }

}
