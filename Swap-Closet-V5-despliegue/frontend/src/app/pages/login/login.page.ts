import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import {
  IonContent,
  IonList,
  IonItem,
  IonInput,
  IonIcon,
  IonButton,
  IonCheckbox
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [
    FormsModule,
    RouterLink,

    IonContent,
    IonList,
    IonItem,
    IonInput,
    IonIcon,
    IonButton,
    IonCheckbox
  ]
})
export class LoginPage {
  modoRegistro = false;

  // Login
  correoSign = '';
  passwordSign = '';

  // Registro
  nombre = '';
  apellidos = '';
  correo = '';
  password = '';
  password2 = '';

  constructor() {}

  login() {
    console.log('Login:', this.correoSign, this.passwordSign);
  }

  guardarUsuario() {
    console.log('Registro:', {
      nombre: this.nombre,
      apellidos: this.apellidos,
      correo: this.correo,
      password: this.password,
      password2: this.password2
    });
  }
}
