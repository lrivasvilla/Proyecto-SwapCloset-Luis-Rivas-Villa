import { Component } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {MenuFooterComponent} from "./components/menu-footer/menu-footer.component";
import {RouterOutlet} from "@angular/router";
import {AuthService} from "./service/authService/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonicModule, MenuFooterComponent, RouterOutlet],
  standalone: true
})
export class AppComponent {
  constructor(private authService: AuthService) {
    this.authService.cargarUsuarioSesion(); // Restaura usuario del localStorage
  }
}
