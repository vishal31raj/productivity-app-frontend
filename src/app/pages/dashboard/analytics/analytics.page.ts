import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { USER_ROLES_DESC } from 'src/app/enums/user-role.enum';
import { SharedModule } from 'src/app/shared.module';
import { OwnerAnalyticsComponent } from './owner-analytics/owner-analytics.component';
import { StaffAnalyticsComponent } from './staff-analytics/staff-analytics.component';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.page.html',
  styleUrls: ['./analytics.page.scss'],
  standalone: true,
  imports: [SharedModule, OwnerAnalyticsComponent, StaffAnalyticsComponent],
})
export class AnalyticsPage implements OnInit {
  USER_ROLE_DESC = USER_ROLES_DESC;
  userRoleId: number;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.checkUserRole();
  }

  checkUserRole() {
    this.authService.user.subscribe((user: any) => {
      if (user) {
        this.userRoleId = user.userRoleId;
      }
    });
  }
}
