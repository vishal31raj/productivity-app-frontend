import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/shared.module';
import { ChecklistService } from '../checklist.service';
import { ToastService } from 'src/app/services/toast.service';
import { Router } from '@angular/router';
import { ImagePickerComponent } from 'src/app/components/image-picker/image-picker.component';
import { FilesService } from 'src/app/services/files.service';
import { AlertService } from 'src/app/services/alert.service';
import { TASK_STATUS_DESC_ENUM } from 'src/app/enums/tasks.enum';
import { AppRoutingConstants } from 'src/app/constants/app-routing';
import { TaskCardComponent } from 'src/app/components/task-card/task-card.component';
import { Location } from '@angular/common';
import { QuillConfig } from 'src/app/constants/quill-config';
import { QuillModule } from 'ngx-quill';
import { USER_ROLES_DESC } from 'src/app/enums/user-role.enum';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-checklist-details',
  templateUrl: './checklist-details.page.html',
  styleUrls: ['./checklist-details.page.scss'],
  standalone: true,
  imports: [SharedModule, ImagePickerComponent, TaskCardComponent, QuillModule],
})
export class ChecklistDetailsPage implements OnInit {
  APP_ROUTES = AppRoutingConstants;
  quillConfig = QuillConfig;

  isLoading: boolean = false;
  checklistDetails: any;

  selectedTab: string = 'description';

  editTitle: boolean = false;
  editDescription: boolean = false;
  newTitle: string | undefined;
  newDescription: string | undefined;

  USER_ROLE_DESC = USER_ROLES_DESC;
  userRoleId: number;

  constructor(
    private checklistService: ChecklistService,
    private toastService: ToastService,
    private router: Router,
    private filesService: FilesService,
    private alertService: AlertService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.checkUserRole();
  }

  ionViewWillEnter() {
    const checklistId = this.router.url.split('/')[4];
    this.getChecklistDetails(checklistId);
  }

  checkUserRole() {
    this.authService.user.subscribe((user: any) => {
      if (user) {
        this.userRoleId = user.userRoleId;
      }
    });
  }

  getChecklistDetails(checklistId: string) {
    this.isLoading = true;
    this.checklistService.GetChecklistDetailsById(checklistId).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.checklistDetails = res.data;

          if (this.checklistDetails.attachments.length > 0) {
            this.checklistDetails.attachments.forEach((item: any) => {
              item.docUrl = this.filesService.formatImageUrl(item.docUrl);
            });
          }
          this.isLoading = false;
        }
      },
      error: (err: any) => {
        this.toastService.showErrorToast(err.error.message);
        this.isLoading = false;
      },
    });
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      this.ionViewWillEnter();
      event.target.complete();
    }, 500);
  }

  onPickImage(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    this.checklistService
      .AddAttachmentToChecklistById(this.checklistDetails._id, formData)
      .subscribe({
        next: (res: any) => {
          if (res.success) {
            this.toastService.showSuccessToast(res.message);
            this.ionViewWillEnter();
          }
        },
        error: (err: any) => {
          this.toastService.showErrorToast(err.error.message);
        },
      });
  }

  async onRemoveAttachment(attId: string) {
    if (this.editTitle || this.editDescription) {
      return;
    }

    const isConfirmed = await this.alertService.presentAlert(
      'Remove attachment?',
      'Are you sure you want to remove this attachment?'
    );

    if (isConfirmed) {
      this.checklistService
        .RemoveAttachmentFromChecklistById(this.checklistDetails._id, {
          attachmentId: attId,
        })
        .subscribe({
          next: (res: any) => {
            if (res.success) {
              this.toastService.showSuccessToast(res.message);
              this.ionViewWillEnter();
            }
          },
          error: (err: any) => {
            this.toastService.showErrorToast(err.error.message);
          },
        });
    }
  }

  onOpenImage(docUrl: string) {
    if (this.editTitle || this.editDescription) {
      return;
    }

    this.filesService.openImage(docUrl);
  }

  onClickEdit(type: string) {
    if (this.editTitle || this.editDescription) {
      return;
    }

    if (type === 'title') {
      this.editTitle = true;
      this.newTitle = this.checklistDetails.title;
    } else if (type === 'description') {
      this.editDescription = true;
      this.newDescription = this.checklistDetails.description;
    }
  }

  onCancelEdit(type: string) {
    if (type === 'title') {
      this.editTitle = false;
      this.newTitle = undefined;
    } else if (type === 'description') {
      this.editDescription = false;
      this.newDescription = undefined;
    }
  }

  onConfirmEdit(type: string) {
    if (type === 'title') {
      if (this.newTitle.trim().length < 5) {
        this.toastService.showErrorToast(
          'Title should be atleat 5 characters!'
        );
      } else {
        this.updateChecklistDetails({ title: this.newTitle }, type);
      }
    } else if (type === 'description') {
      if (this.newDescription.trim().length < 5) {
        this.toastService.showErrorToast(
          'Description should be atleat 5 characters!'
        );
      } else {
        this.updateChecklistDetails({ description: this.newDescription }, type);
      }
    }
  }

  updateChecklistDetails(reqBody: any, type: string) {
    this.checklistService
      .EditChecklistDetailsById(this.checklistDetails._id, reqBody)
      .subscribe({
        next: (res: any) => {
          if (res.success) {
            this.toastService.showSuccessToast(res.message);
            this.onCancelEdit(type);
            this.ionViewWillEnter();
          }
        },
        error: (err: any) => {
          this.toastService.showErrorToast(err.error.message);
        },
      });
  }

  onTaskItemClick(taskId: string) {
    if (this.editTitle || this.editDescription) {
      return;
    }
    this.router.navigate([this.APP_ROUTES.TaskDetails + '/' + taskId]);
  }

  async onDeleteChecklist() {
    const isConfirmed = await this.alertService.presentAlert(
      'Delete Checklist?',
      'Deleting checklist would delete all its tasks, attachements and comments. Are you sure you want to performthis action?'
    );
    if (isConfirmed) {
      this.checklistService
        .DeleteChecklistById(this.checklistDetails._id)
        .subscribe({
          next: (res: any) => {
            if (res.success) {
              this.toastService.showSuccessToast(res.message);
              // this.location.back();
              this.router.navigate([this.APP_ROUTES.ChecklistsList]);
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
