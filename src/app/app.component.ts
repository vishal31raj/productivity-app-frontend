import { Component } from '@angular/core';
import { SidebarPage } from './pages/shared/sidebar/sidebar.page';
import { SharedModule } from './shared.module';
import { FooterPage } from './pages/shared/footer/footer.page';
import { SocketService } from './services/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [SidebarPage, FooterPage, SharedModule],
  standalone: true,
})
export class AppComponent {
  constructor() {}

  ngOnInit() {}
}
