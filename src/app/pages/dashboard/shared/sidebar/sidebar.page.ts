import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { SidebarNavigation } from 'src/app/constants/app-navigation';
import { SharedModule } from 'src/app/shared.module';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.page.html',
  styleUrls: ['./sidebar.page.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class SidebarPage implements OnInit {
  userDetails: any;

  sidebarNavItems = SidebarNavigation;

  constructor(private _authService: AuthService) {}

  ngOnInit() {
    this._authService.user.subscribe((user: any) => {
      this.userDetails = user;
    });
  }

  onLogout() {
    this._authService.logout();
  }
}
