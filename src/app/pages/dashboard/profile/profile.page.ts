import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/shared.module';
import { ProfileService } from './profile.service';
import { ToastService } from 'src/app/services/toast.service';
import { ImagePickerComponent } from 'src/app/components/image-picker/image-picker.component';
import { FilesService } from 'src/app/services/files.service';
import { ModalController } from '@ionic/angular';
import { ChangePasswordComponent } from './change-password/change-password.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [SharedModule, ImagePickerComponent],
})
export class ProfilePage implements OnInit {
  isLoading: boolean = false;
  profileDetails: any;

  constructor(
    private profileService: ProfileService,
    private toastService: ToastService,
    private filesService: FilesService,
    private modalController: ModalController
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.getProfileDetails();
  }

  getProfileDetails() {
    this.isLoading = true;
    this.profileService.getProfileDetails().subscribe({
      next: (res: any) => {
        if (res.success === true) {
          if (res.data.documents.length) {
            res.data.documents.forEach((doc: any) => {
              doc.docUrl = this.filesService.formatImageUrl(doc.docUrl);
            });
          }

          this.profileDetails = res.data;
          this.isLoading = false;
        }
      },
      error: (err: any) => {
        this.toastService.showErrorToast(err.error.message);
        this.isLoading = false;
      },
    });
  }

  onPickImage(file: File) {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      this.profileService.changeProfileImgUrl(formData).subscribe({
        next: (res: any) => {
          if (res.success === true) {
            this.toastService.showSuccessToast(res.message);
            this.getProfileDetails();
          }
        },
        error: (err: any) => {
          this.toastService.showErrorToast(err.error.message);
        },
      });
    }
  }

  onOpenImage(docUrl: string) {
    this.filesService.openImage(docUrl);
  }

  changeUserPassword(reqBody: any, modal: any) {
    this.profileService.resetPassword(reqBody).subscribe({
      next: async (res: any) => {
        this.toastService.showSuccessToast(res.message);
        await modal.dismiss();
      },
      error: (err: any) => {
        this.toastService.showErrorToast(err.error.message);
      },
    });
  }

  async onChangePasswordBtnClick() {
    const modal = await this.modalController.create({
      component: ChangePasswordComponent,
      initialBreakpoint: 0.75,
      breakpoints: [0, 0.75, 1],
      componentProps: {
        changePassword: async (reqBody) => {
          this.changeUserPassword(reqBody, modal);
        },
      },
    });

    await modal.present();
  }
}
