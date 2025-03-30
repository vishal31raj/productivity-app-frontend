import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { USER_ROLES_DESC } from 'src/app/enums/user-role.enum';
import { FilesService } from 'src/app/services/files.service';
import { SharedModule } from 'src/app/shared.module';
import { CountdownTimerComponent } from '../countdown-timer/countdown-timer.component';
import { BANNER_TYPE_DESC_ENUM, BANNER_TYPE_ID_ENUM } from 'src/app/enums/banner-type.enum';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
  standalone: true,
  imports: [SharedModule, CountdownTimerComponent],
})
export class BannerComponent implements OnInit {
  @Input() bannerDetails: any;

  USER_ROLE_DESC = USER_ROLES_DESC;
  userRoleId: number;
  BANNER_TYPES = BANNER_TYPE_ID_ENUM;

  constructor(
    private authService: AuthService,
    private filesService: FilesService
  ) {}

  ngOnChanges() {
    if (this.bannerDetails.imgUrl) {
      this.bannerDetails.imgUrl = this.filesService.formatImageUrl(
        this.bannerDetails.imgUrl
      );
    }
    console.log('bannerDetails', this.bannerDetails);
  }

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
