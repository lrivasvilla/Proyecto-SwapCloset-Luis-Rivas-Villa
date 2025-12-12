import {Component, computed, effect, inject, Input, OnInit, signal} from '@angular/core';
import {IonicModule, ToastController} from "@ionic/angular";
import {AsyncPipe, NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {UsuarioDTO} from "../../modelos/UsuarioDTO";
import {Observable} from "rxjs";
import {RaitingService} from "../../service/raitingService/raiting.service";
import {FavoritosService} from "../../service/favoritosService/favoritos.service";
import {SeguidoresService} from "../../service/seguidoresService/seguidores.service";

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
export class CabeceraPerfilComponent {

  @Input() usuario = signal<UsuarioDTO | null>(null);

  media = signal<number>(0);               // valor real del backend
  ratingSeleccionado = signal<number>(0);  // valor manual

  numFavoritos: Observable<number> | undefined;
  numSeguidores: Observable<number> | undefined;

  maxStars = 5;

  private raitingService = inject(RaitingService);
  private favoritosService = inject(FavoritosService);
  private seguidoresService = inject(SeguidoresService);

  constructor(private toastCtrl: ToastController) {

    // Cuando cambia el usuario → pedir media
    effect(() => {
      const u = this.usuario();
      if (u?.id) {
        this.raitingService.getMediaRaitingByUsuario(u.id)
          .subscribe(valor => {
            this.media.set(valor);
          });
        this.numFavoritos = this.favoritosService.getCountFavoritos(u.id);
        this.numSeguidores = this.seguidoresService.getCountSeguidores(u.id);
      }
    });
  }

  // ⭐ Selección manual del usuario
  setRating(valor: number) {
    this.ratingSeleccionado.set(valor);
    this.toastVotacion()
  }

  // ⭐ Valor visual de estrellas (media o selección)
  ratingVisual = computed(() => {
    return this.ratingSeleccionado() === 0
      ? this.media()
      : this.ratingSeleccionado();
  });

  async cambiarFoto() {
    const toast = await this.toastCtrl.create({
      message: 'Abrir selector de imagen 📸',
      duration: 1500,
      position: 'bottom'
    });
    await toast.present();
  }

  async toastVotacion(ratingSeleccionado: number = this.ratingSeleccionado()) {
    const toast = await this.toastCtrl.create({
      message: '¡Has votado con '+ratingSeleccionado+' ⭐ a '+this.usuario()?.nombre+'!',
      duration: 1500,
      position: 'top'
    });
    await toast.present();
  }

  protected readonly Math = Math;

}
