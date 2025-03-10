import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/shared.module';
import { ChecklistService } from '../checklist.service';
import { ToastService } from 'src/app/services/toast.service';
import { Router } from '@angular/router';
import { ImagePickerComponent } from 'src/app/components/image-picker/image-picker.component';
import { FilesService } from 'src/app/services/files.service';
import { AlertService } from 'src/app/services/alert.service';
import {
  TASK_PRIORITY_ID_ENUM,
  TASK_STATUS_ID_ENUM,
} from 'src/app/enums/tasks.enum';

@Component({
  selector: 'app-checklist-details',
  templateUrl: './checklist-details.page.html',
  styleUrls: ['./checklist-details.page.scss'],
  standalone: true,
  imports: [SharedModule, ImagePickerComponent],
})
export class ChecklistDetailsPage implements OnInit {
  isLoading: boolean = false;
  checklistDetails: any;

  constructor(
    private checklistService: ChecklistService,
    private toastService: ToastService,
    private router: Router,
    private filesService: FilesService,
    private alertService: AlertService
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    const checklistId = this.router.url.split('/')[3];
    this.getChecklistDetails(checklistId);
  }

  getChecklistDetails(checklistId: string) {
    this.isLoading = true;
    this.checklistService.GetChecklistDetailsById(checklistId).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.checklistDetails = res.data;

          if (this.checklistDetails.attachments.length > 0) {
            this.checklistDetails.attachments.forEach((item: any) => {
              item.imgUrl = this.filesService.formatImageUrl(item.imgUrl);
            });
          }

          console.log(this.checklistDetails);

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
    formData.append('images', file);

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

  onOpenImage(imgUrl: string) {
    this.filesService.openImage(imgUrl);
  }

  getTaskStatus(statusId: number) {
    return TASK_STATUS_ID_ENUM[statusId];
  }

  getTaskPriority(priorityId: number) {
    return TASK_PRIORITY_ID_ENUM[priorityId] + ' Priority';
  }
}
