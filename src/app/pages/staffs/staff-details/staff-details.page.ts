import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/shared.module';
import { StaffsService } from '../staffs.service';
import { ToastService } from 'src/app/services/toast.service';
import { Router } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { TasksComponent } from './tasks/tasks.component';
import { AlertService } from 'src/app/services/alert.service';
import { Location } from '@angular/common';
import { FilesService } from 'src/app/services/files.service';

@Component({
  selector: 'app-staff-details',
  templateUrl: './staff-details.page.html',
  styleUrls: ['./staff-details.page.scss'],
  standalone: true,
  imports: [SharedModule, DetailsComponent, TasksComponent],
})
export class StaffDetailsPage implements OnInit {
  isLoading: boolean | undefined;
  staffId: string | undefined;
  staffDetails: any;
  selectedTab = 'details';

  isActionSheetOpen: boolean = false;
  public actionSheetButtons: any[] = [];

  constructor(
    private staffsService: StaffsService,
    private toastService: ToastService,
    private router: Router,
    private location: Location,
    private alertService: AlertService,
    private filesService: FilesService
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.staffId = this.router.url.split('/')[2];
    this.getStaffDetails();
  }

  getStaffDetails() {
    this.isLoading = true;
    this.staffsService.getStaffDetailsById(this.staffId).subscribe({
      next: (res: any) => {
        if (res.success === true) {
          this.staffDetails = res.data;

          if (this.staffDetails.profileImgUrl) {
            this.staffDetails.profileImgUrl = this.filesService.formatImageUrl(
              this.staffDetails.profileImgUrl
            );
          }

          this.initializeActionSheetButtons();
          this.isLoading = false;
        }
      },
      error: (err: any) => {
        this.toastService.showErrorToast(err.error.message);
        this.isLoading = false;
      },
    });
  }

  initializeActionSheetButtons() {
    this.actionSheetButtons = [
      {
        text: this.staffDetails.isActive
          ? 'Mark as Inactive'
          : 'Mark as Active',
        data: {
          action: 'edit',
        },
        handler: () => {
          this.onChangeStatus();
        },
      },
      {
        text: 'Delete',
        role: 'destructive',
        data: {
          action: 'delete',
        },
        handler: () => {
          this.deleteStaff();
        },
      },
    ];
  }

  async onChangeStatus() {
    const isConfirmed = await this.alertService.presentAlert(
      'Change status?',
      'Are you sure you want to change the status of ' +
        this.staffDetails.name +
        '?'
    );
    if (isConfirmed) {
      this.changeStatusOfStaff();
    }
  }

  changeStatusOfStaff() {
    this.staffsService
      .changeActiveStatus(this.staffDetails._id, !this.staffDetails.isActive)
      .subscribe({
        next: (res: any) => {
          if (res.success === true) {
            this.toastService.showSuccessToast(res.message);
            this.getStaffDetails();
          }
        },
        error: (err: any) => {
          this.toastService.showErrorToast(err.error.message);
        },
      });
  }

  async deleteStaff() {
    const isConfirmed = await this.alertService.presentAlert(
      'Delete staff?',
      'Are you sure you want to delete ' + this.staffDetails.name + '?'
    );
    if (isConfirmed) {
      this.staffsService.deleteStaffById(this.staffDetails._id).subscribe({
        next: (res: any) => {
          if (res.success === true) {
            this.toastService.showSuccessToast(res.message);
            this.location.back();
          }
        },
        error: (err: any) => {
          this.toastService.showErrorToast(err.error.message);
        },
      });
    }
  }

  onSwitchTabEvent(event: any) {
    this.selectedTab = event.target.value;
  }
}
