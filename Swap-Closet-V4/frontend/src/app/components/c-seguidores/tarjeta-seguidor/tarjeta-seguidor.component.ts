import {Component, effect, inject, Input, OnInit, signal} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {AsyncPipe, NgClass} from "@angular/common";
import {UsuarioDTO} from "../../../modelos/UsuarioDTO";
import {FavoritosService} from "../../../service/favoritosService/favoritos.service";
import {RaitingService} from "../../../service/raitingService/raiting.service";
import {Observable} from "rxjs";
import {UsuarioService} from "../../../service/usuarioService/usuario.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-tarjeta-seguidor',
  templateUrl: './tarjeta-seguidor.component.html',
  styleUrls: ['./tarjeta-seguidor.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    NgClass,
    AsyncPipe
  ]
})
export class TarjetaSeguidorComponent implements OnInit{

  seguido = false;

  @Input() usuario!: UsuarioDTO; // Si viene por Input, usarlo.
  media!: Observable<number>;

  private raitingService = inject(RaitingService);
  private usuarioService = inject(UsuarioService);
  private route = inject(ActivatedRoute);

  ngOnInit() {

    // Si NO entra usuario por @Input, cargamos desde la ruta
    if (!this.usuario) {
      const id = Number(this.route.snapshot.paramMap.get('id'));

      if (!id) {
        console.warn('No hay ID en la ruta y no vino por @Input');
        return;
      }

      this.usuarioService.getUsuario(id).subscribe({
        next: (u) => {
          this.usuario = u;
          this.media = this.raitingService.getMediaRaitingByUsuario(u.id!);
        }
      });
    } else {
      // Si vino por @Input, cargar media directamente
      this.media = this.raitingService.getMediaRaitingByUsuario(this.usuario.id!);
    }
  }

  toggleSeguir() {
    this.seguido = !this.seguido;
  }
}
