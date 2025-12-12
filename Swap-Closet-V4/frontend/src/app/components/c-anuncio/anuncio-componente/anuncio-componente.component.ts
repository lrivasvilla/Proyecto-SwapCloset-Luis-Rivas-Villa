import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {ProductoDTO} from "../../../modelos/ProductoDTO";
import {CartaUsuarioDTO} from "../../../modelos/CartaUsuarioDTO";
import {RouterLink} from "@angular/router";


@Component({
  selector: 'app-anuncio-componente',
  templateUrl: './anuncio-componente.component.html',
  styleUrls: ['./anuncio-componente.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    NgForOf,
    RouterLink,
    NgClass,
    NgIf
  ]
})
export class AnuncioComponenteComponent implements OnInit {

  @Input() producto: ProductoDTO | null = null;
  @Input() usuario: CartaUsuarioDTO | null = null;
  @Input() estilos: string[] = [];
  @Input() primeraImagen: string = '';
  @Input() idUsuarioLogueado: number | undefined;
  @Input() modoEdicion: boolean = false;

  @Output() guardarHijo = new EventEmitter<ProductoDTO>();

  productoEditable!: ProductoDTO;

  ngOnInit() {
    if (this.producto) {
      this.productoEditable = JSON.parse(JSON.stringify(this.producto));
    }
  }

  guardar() {
    this.guardarHijo.emit(this.productoEditable);
  }

  cancelar() {
    this.productoEditable = JSON.parse(JSON.stringify(this.producto));
  }
}
