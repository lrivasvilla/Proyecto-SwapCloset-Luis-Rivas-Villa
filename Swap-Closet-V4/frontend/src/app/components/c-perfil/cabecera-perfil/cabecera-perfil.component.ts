import {Component, effect, inject, Input, input, OnInit, signal} from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import{RouterLink} from "@angular/router";
import {UsuarioDTO} from "../../../modelos/UsuarioDTO";
import {Observable} from "rxjs";
import {RaitingService} from "../../../service/raitingService/raiting.service";
import {FavoritosService} from "../../../service/favoritosService/favoritos.service";
import {SeguidoresService} from "../../../service/seguidoresService/seguidores.service";
import {UsuarioEstadisticasDTO} from "../../../modelos/UsuarioEstadisticasDTO";

@Component({
  selector: 'app-cabecera-perfil',
  templateUrl: './cabecera-perfil.component.html',
  styleUrls: ['./cabecera-perfil.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLink]
})
export class CabeceraPerfilComponent{

  @Input() usuario = signal<UsuarioEstadisticasDTO | null>(null);

  maxStars = 5;

  constructor(private toastCtrl: ToastController) {}

  async cambiarFoto() {
    const toast = await this.toastCtrl.create({
      message: 'Abrir selector de imagen 📸',
      duration: 1500,
      position: 'top'
    });
    await toast.present();
  }
}

