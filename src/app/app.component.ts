import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { SidebarPage } from './pages/shared/sidebar/sidebar.page';
import { SharedModule } from './shared.module';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [SidebarPage, SharedModule],
  standalone: true
})
export class AppComponent {
  constructor() {}
}
