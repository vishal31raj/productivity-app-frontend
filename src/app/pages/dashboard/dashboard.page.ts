import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/shared.module';
import { SidebarPage } from './shared/sidebar/sidebar.page';
import { FooterPage } from './shared/footer/footer.page';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [SharedModule, SidebarPage, FooterPage],
})
export class DashboardPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
