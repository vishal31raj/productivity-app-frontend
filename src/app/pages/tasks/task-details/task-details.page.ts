import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedModule } from 'src/app/shared.module';
import { TasksService } from '../tasks.service';
import { ToastService } from 'src/app/services/toast.service';
import { ImagePickerComponent } from 'src/app/components/image-picker/image-picker.component';
import { AlertService } from 'src/app/services/alert.service';
import { FilesService } from 'src/app/services/files.service';
import { TASK_STATUS_DESC_ENUM } from 'src/app/enums/tasks.enum';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.page.html',
  styleUrls: ['./task-details.page.scss'],
  standalone: true,
  imports: [SharedModule, ImagePickerComponent],
})
export class TaskDetailsPage implements OnInit {
  TaskStatusDescEnum = TASK_STATUS_DESC_ENUM;

  isLoading: boolean = false;
  taskDetails: any;

  editTitle: boolean = false;
  editDescription: boolean = false;
  newTitle: string | undefined;
  newDescription: string | undefined;

  constructor(
    private router: Router,
    private tasksService: TasksService,
    private toastService: ToastService,
    private alertService: AlertService,
    private filesService: FilesService
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    const taskId = this.router.url.split('/')[3];
    this.getTaskDetails(taskId);
  }

  getTaskDetails(taskId: string) {
    this.isLoading = true;
    this.tasksService.getTaskDetails(taskId).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.taskDetails = res.data;

          if (this.taskDetails.attachments.length > 0) {
            this.taskDetails.attachments.forEach((item: any) => {
              item.imgUrl = this.filesService.formatImageUrl(item.imgUrl);
            });
          }

          console.log('taskDetails', this.taskDetails);
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

    this.tasksService
      .AddAttachmentToTask(this.taskDetails._id, formData)
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
      this.tasksService
        .RemoveAttachmentFromTask(this.taskDetails._id, {
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
    if (this.editTitle || this.editDescription) {
      return;
    }

    this.filesService.openImage(imgUrl);
  }

  onClickEdit(type: string) {
    if (this.editTitle || this.editDescription) {
      return;
    }

    if (type === 'title') {
      this.editTitle = true;
      this.newTitle = this.taskDetails.title;
    } else if (type === 'description') {
      this.editDescription = true;
      this.newDescription = this.taskDetails.description;
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
    this.tasksService.editTaskDetails(this.taskDetails._id, reqBody).subscribe({
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
}
