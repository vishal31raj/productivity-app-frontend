import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { SharedModule } from 'src/app/shared.module';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.page.html',
  styleUrls: ['./sidebar.page.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class SidebarPage implements OnInit {
  sidebarNavItems = [
    // {
    //   label: 'Staffs*',
    //   routerLink: AppRoutingConstants.AdminStaffs,
    //   iconName: 'people-circle',
    // },
  ];

  constructor(private _authService: AuthService) {}

  ngOnInit() {}

  onLogout() {
    this._authService.logout();
  }
}
