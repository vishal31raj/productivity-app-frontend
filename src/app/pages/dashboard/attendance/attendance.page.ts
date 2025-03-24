import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { USER_ROLES_DESC } from 'src/app/enums/user-role.enum';
import { SharedModule } from 'src/app/shared.module';
import { OwnerAttendanceComponent } from './owner-attendance/owner-attendance.component';
import { StaffAttendanceComponent } from './staff-attendance/staff-attendance.component';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.page.html',
  styleUrls: ['./attendance.page.scss'],
  standalone: true,
  imports: [SharedModule, OwnerAttendanceComponent, StaffAttendanceComponent],
})
export class AttendancePage implements OnInit {
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
