import {Component, inject, OnInit} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ProductoFormService} from "../../../service/productoFormService/producto-form.service";

@Component({
    selector: 'app-tipo-oferta',
    templateUrl: './tipo-oferta.component.html',
    styleUrls: ['./tipo-oferta.component.scss'],
    standalone: true,
    imports: [
      IonicModule,
      NgIf,
      FormsModule
    ]
})
export class TipoOfertaComponent  implements OnInit {

  tipoOferta: string = 'intercambio';
  precio: number | null = null;
  mostrarCalendario: boolean = false;
  fechaDevolucion: string | null = null;

  private formService = inject(ProductoFormService);

  ngOnInit() {
  }

  onTipoOfertaChange(event: any) {
    this.tipoOferta = event.detail.value;

    if (this.tipoOferta === 'prestamo') {
      this.formService.updateForm({tipoOferta: 'prestamo'});
      this.formService.updateForm({precio: this.precio});
    } else {
      this.precio = null;
      this.formService.updateForm({tipoOferta: 'intercambio'});
      this.formService.updateForm({precio: null});
    }
  }

  onPrecioChange(event: any) {
    const valor = Number(event.target.value);
    this.precio = valor;
    this.formService.updateForm({precio: valor});
  }

  toggleCalendario() {
    this.mostrarCalendario = !this.mostrarCalendario;
  }

  onFechaChange(event: any) {
    this.fechaDevolucion = event.detail.value;
    this.formService.updateForm({fechaDevolucion: this.fechaDevolucion?.toString()});
  }
}
