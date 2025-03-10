import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { FooterNavigation } from 'src/app/constants/app-navigation';
import { SharedModule } from 'src/app/shared.module';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.page.html',
  styleUrls: ['./footer.page.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class FooterPage implements OnInit {
  userLoggedIn: boolean;
  footerNavItems = FooterNavigation;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.checkAuthentication();
  }

  checkAuthentication() {
    this.authService.user.subscribe((user: any) => {
      this.userLoggedIn = !!user;
    });
  }
}
