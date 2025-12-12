import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
    selector: 'app-anuncio-intercambio',
    templateUrl: './anuncio-intercambio.component.html',
    styleUrls: ['./anuncio-intercambio.component.scss'],
    standalone: true,
    imports: [
        IonicModule,
        NgForOf,
        RouterLink
    ]
})
export class AnuncioIntercambioComponent  implements OnInit {

  estilos = ['Casual', 'Informal', 'Ocasional', 'Fiesta', 'Verano'];

  constructor() { }

  ngOnInit() {}

}
