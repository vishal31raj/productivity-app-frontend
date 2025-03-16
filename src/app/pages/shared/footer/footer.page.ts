import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { FooterNavigation } from 'src/app/constants/app-navigation';
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
  footerNavItems = FooterNavigation;

  hasNewMessage = false;

  constructor(
    private authService: AuthService,
    private socketService: SocketService,
  ) {}

  ngOnInit() {
    this.checkAuthentication();
  }

  checkAuthentication() {
    this.authService.user.subscribe((user: any) => {
      this.userLoggedIn = !!user;
      if (this.userLoggedIn) {
        this.currentUserId = user.userId;
        this.socketConnectionForNotificationDot();
      }
    });
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
