import {Component, computed, effect, inject, Input, OnInit, signal} from '@angular/core';
import {IonicModule, ToastController} from "@ionic/angular";
import {AsyncPipe, NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {UsuarioDTO} from "../../modelos/UsuarioDTO";
import {Observable} from "rxjs";
import {RaitingService} from "../../service/raitingService/raiting.service";
import {FavoritosService} from "../../service/favoritosService/favoritos.service";
import {SeguidoresService} from "../../service/seguidoresService/seguidores.service";
import {UsuarioEstadisticasDTO} from "../../modelos/UsuarioEstadisticasDTO";
import {UsuarioService} from "../../service/usuarioService/usuario.service";

@Component({
    selector: 'app-cabecera-perfil',
    templateUrl: './cabecera-perfil.component.html',
    styleUrls: ['./cabecera-perfil.component.scss'],
    standalone: true,
  imports: [
    IonicModule,
    NgForOf,
    RouterLink,
    AsyncPipe
  ]
})
export class CabeceraPerfilComponent{

  @Input() usuario = signal<UsuarioEstadisticasDTO | null>(null);

  usuarioEstadisticas = signal<UsuarioEstadisticasDTO | null>(null);

  private usuarioService = inject(UsuarioService);
  private toastCtrl = inject(ToastController); // Se inyecta aquí en lugar del constructor

  ratingSeleccionado = signal<number>(0);
  maxStars = 5;

  constructor() {
    effect(() => {
      this.cargarUsuario();
    });
  }

  cargarUsuario() {
    const usuarioActual = this.usuario();

    if (usuarioActual && usuarioActual.id != null) {
      const idUsuario: number = usuarioActual.id;

      this.usuarioService.getUsuarioEstadisticas(idUsuario)
        .subscribe(estadisticas => {
          this.usuarioEstadisticas.set(estadisticas);
        });
    } else {
      this.usuarioEstadisticas.set(null);
    }
  }

  ratingVisual = computed(() => {
    const u = this.usuario();
    if (!u) return 0;

    const ratingBase = u.raiting ?? 0;

    return this.ratingSeleccionado() === 0
      ? ratingBase
      : this.ratingSeleccionado();
  });

  setRating(valor: number) {
    this.ratingSeleccionado.set(valor);
    this.toastVotacion();
  }

  async toastVotacion(rating = this.ratingSeleccionado()) {
    const u = this.usuario();

    const toast = await this.toastCtrl.create({
      message: `¡Has votado con ${rating} ⭐ a ${u?.nombre}!`,
      duration: 1500,
      position: 'top'
    });

    await toast.present();
  }

  protected readonly Math = Math;
}
