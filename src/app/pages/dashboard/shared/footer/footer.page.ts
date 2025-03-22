import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import {
  OwnerFooterNavigation,
  StaffFooterNavigation,
} from 'src/app/constants/app-navigation';
import { USER_ROLES_DESC } from 'src/app/enums/user-role.enum';
import { SocketService } from 'src/app/services/socket.service';
import { SharedModule } from 'src/app/shared.module';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.page.html',
  styleUrls: ['./footer.page.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class FooterPage implements OnInit {
  currentUserId: string;
  userLoggedIn: boolean;
  footerNavItems: any[];

  hasNewMessage = false;

  constructor(
    private authService: AuthService,
    private socketService: SocketService
  ) {}

  ngOnInit() {
    this.checkAuthentication();
  }

  checkAuthentication() {
    this.authService.user.subscribe((user: any) => {
      this.userLoggedIn = !!user;
      if (this.userLoggedIn) {
        this.configureFooterTabsBasedOnUserRole(user.userRoleId);
        this.currentUserId = user.userId;
        this.socketConnectionForNotificationDot();
      }
    });
  }

  configureFooterTabsBasedOnUserRole(userRoleId: number) {
    if (userRoleId === USER_ROLES_DESC.OWNER) {
      this.footerNavItems = OwnerFooterNavigation;
    } else if (userRoleId === USER_ROLES_DESC.EMPLOYEE) {
      this.footerNavItems = StaffFooterNavigation;
    }
  }

  socketConnectionForNotificationDot() {
    this.socketService.message$.subscribe((event: any) => {
      if (event && event.action === 'newMessage') {
        if (event.message.sender._id !== this.currentUserId) {
          this.hasNewMessage = true;
        }
      }
    });
  }

  markMessagesAsRead() {
    this.hasNewMessage = false;
  }
}
