import { Component } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import {AuthService} from "./service/authService/auth.service";
import {MenuFooterComponent} from "./components/menu-footer/menu-footer.component";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, MenuFooterComponent],
  standalone: true
})
export class AppComponent {
  constructor(private authService: AuthService) {
    this.authService.cargarUsuarioSesion(); // Restaura usuario del localStorage
  }
}
