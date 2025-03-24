import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import {
  OwnerSidebarNavItems,
  StaffSidebarNavItems,
} from 'src/app/constants/app-navigation';
import { USER_ROLES_DESC, USER_ROLES_ID } from 'src/app/enums/user-role.enum';
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

  sidebarNavItems: any[];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.checkAuthentication();
  }

  checkAuthentication() {
    this.authService.user.subscribe((user: any) => {
      this.userDetails = user;
      if (this.userDetails) {
        this.configureFooterTabsBasedOnUserRole(user.userRoleId);
      }
    });
  }

  configureFooterTabsBasedOnUserRole(userRoleId: number) {
    if (userRoleId === USER_ROLES_DESC.OWNER) {
      this.sidebarNavItems = OwnerSidebarNavItems;
    } else if (userRoleId === USER_ROLES_DESC.EMPLOYEE) {
      this.sidebarNavItems = StaffSidebarNavItems;
    }
  }

  onLogout() {
    this.authService.logout();
  }

  getUserRole() {
    return USER_ROLES_ID[this.userDetails.userRoleId];
  }
}
