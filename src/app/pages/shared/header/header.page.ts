import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AppRoutingConstants } from 'src/app/constants/app-routing';
import { AuthService } from 'src/app/auth/auth.service';
import { SharedModule } from 'src/app/shared.module';
import { FilesService } from 'src/app/services/files.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.page.html',
  styleUrls: ['./header.page.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class HeaderPage implements OnInit {
  DUMMY_IMG_URL = '../../../../assets/img/dummy-user.png';
  APP_ROUTES = AppRoutingConstants;

  userDetails: any;

  @Input() type: string | undefined;
  @Input() title: string | undefined;
  @Input() showDelete: boolean = false;

  @Output() closeBtnClickEvent: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Output() deleteBtnClickEvent: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  constructor(
    private navCntrl: NavController,
    private filesService: FilesService,
    private _authService: AuthService
  ) {}

  ngOnInit() {
    this._authService.user.subscribe((user: any) => {
      this.userDetails = user;
      if (
        this.userDetails && this.userDetails.profileImgUrl &&
        !this.userDetails.profileImgUrl.includes('http')
      ) {
        this.userDetails.profileImgUrl = this.filesService.formatImageUrl(
          this.userDetails.profileImgUrl
        );
      }
    });
  }

  goBack() {
    this.navCntrl.back();
  }

  onCloseBtnClick() {
    this.closeBtnClickEvent?.emit(false);
  }

  onDeleteBtnClick() {
    this.deleteBtnClickEvent.emit();
  }
}
