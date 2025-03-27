import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedModule } from 'src/app/shared.module';
import { TasksService } from '../tasks.service';
import { ToastService } from 'src/app/services/toast.service';
import { ImagePickerComponent } from 'src/app/components/image-picker/image-picker.component';
import { AlertService } from 'src/app/services/alert.service';
import { FilesService } from 'src/app/services/files.service';
import {
  TASK_PRIORITY_DESC_ENUM,
  TASK_STATUS_DESC_ENUM,
  TASK_STATUS_ID_ENUM,
} from 'src/app/enums/tasks.enum';
import { AlertController } from '@ionic/angular';
import { StaffsService } from '../../staffs/staffs.service';
import { RelativeTimePipe } from 'src/app/pipes/relative-time.pipe';
import { CommentSectionComponent } from 'src/app/components/comment-section/comment-section.component';
import { Location } from '@angular/common';
import { QuillConfig } from 'src/app/constants/quill-config';
import { QuillModule } from 'ngx-quill';
import { AuthService } from 'src/app/auth/auth.service';
import { USER_ROLES_DESC, USER_ROLES_ID } from 'src/app/enums/user-role.enum';
import { AppRoutingConstants } from 'src/app/constants/app-routing';

interface AppSelectInput {
  type: 'radio' | 'checkbox' | 'text';
  label: string;
  value: string | number;
}

interface AppSelectButton {
  text: string;
  role?: string;
  handler?: (value?: any) => void;
}

interface AppSelectAlert {
  header: string;
  inputs: AppSelectInput[];
  buttons: AppSelectButton[];
}

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.page.html',
  styleUrls: ['./task-details.page.scss'],
  standalone: true,
  imports: [
    SharedModule,
    ImagePickerComponent,
    CommentSectionComponent,
    QuillModule,
  ],
})
export class TaskDetailsPage implements OnInit {
  APP_ROUTES = AppRoutingConstants;
  TaskStatusIdEnum = TASK_STATUS_ID_ENUM;
  TaskStatusDescEnum = TASK_STATUS_DESC_ENUM;
  quillConfig = QuillConfig;

  selectedTab: string = 'description';

  isLoading: boolean = false;
  taskDetails: any;

  editTitle: boolean = false;
  editDescription: boolean = false;
  newTitle: string | undefined;
  newDescription: string | undefined;

  USER_ROLE_DESC = USER_ROLES_DESC;
  userDetails: any;

  selectAlertBody: AppSelectAlert = {
    header: undefined,
    inputs: undefined,
    buttons: undefined,
  };

  constructor(
    private router: Router,
    private tasksService: TasksService,
    private toastService: ToastService,
    private alertService: AlertService,
    private filesService: FilesService,
    private alertController: AlertController,
    private staffsService: StaffsService,
    private location: Location,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.checkUserRole();
  }

  ionViewWillEnter() {
    const taskId = this.router.url.split('/')[4];
    this.getTaskDetails(taskId);
  }

  checkUserRole() {
    this.authService.user.subscribe((user: any) => {
      if (user) {
        this.userDetails = user;
      }
    });
  }

  getTaskDetails(taskId: string) {
    this.isLoading = true;
    this.tasksService.getTaskDetails(taskId).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.taskDetails = res.data;

          if (this.taskDetails.attachments.length > 0) {
            this.taskDetails.attachments.forEach((item: any) => {
              item.docUrl = this.filesService.formatImageUrl(item.docUrl);
            });
          }
          if (this.taskDetails.comments.length > 0) {
            this.taskDetails.comments.forEach((comment: any) => {
              if (comment.attachments.length) {
                comment.attachments.forEach((item: any) => {
                  item.docUrl = this.filesService.formatImageUrl(item.docUrl);
                });
              }
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
        this.updateTaskDetails({ title: this.newTitle }, type);
      }
    } else if (type === 'description') {
      if (this.newDescription.trim().length < 5) {
        this.toastService.showErrorToast(
          'Description should be atleat 5 characters!'
        );
      } else {
        this.updateTaskDetails({ description: this.newDescription }, type);
      }
    }
  }

  updateTaskDetails(reqBody: any, type: string | null) {
    this.tasksService.editTaskDetails(this.taskDetails._id, reqBody).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.toastService.showSuccessToast(res.message);
          if (type) {
            this.onCancelEdit(type);
          }
          this.ionViewWillEnter();
        }
      },
      error: (err: any) => {
        this.toastService.showErrorToast(err.error.message);
      },
    });
  }

  async openSelectAlert(type: string) {
    let header = '';
    let inputs: AppSelectInput[] = [];

    if (
      type === 'priority' &&
      this.userDetails?.userRoleId === this.USER_ROLE_DESC.OWNER
    ) {
      if (!this.showOpenAlertDropdown()) return;
      header = 'Change Task Priority';
      inputs = TASK_PRIORITY_DESC_ENUM.map((item: any) => ({
        type: 'radio',
        label: item.name,
        value: item.id,
      }));
    } else if (type === 'status') {
      if (!this.showChangeStatusDropdown()) return;
      header = 'Change Task Status';
      inputs = this.getTaskNextStatusesList();
    } else if (
      type === 'staff' &&
      this.userDetails?.userRoleId === this.USER_ROLE_DESC.OWNER
    ) {
      if (!this.showOpenAlertDropdown()) return;
      const activeStaffsList = await this.getAllActiveStaffs();
      header = 'Change Assigned Staff';
      inputs = activeStaffsList.map((item: any) => ({
        type: 'radio',
        label: item.name,
        value: item._id,
      }));
    } else {
      return;
    }

    this.selectAlertBody = {
      header,
      inputs,
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Confirm',
          handler: (data) => {
            if (!data) return;
            if (type === 'priority')
              this.updateTaskDetails({ priorityId: data }, null);
            else if (type === 'status')
              this.updateTaskDetails({ statusId: data }, null);
            else if (type === 'staff') this.assignTaskToStaff(data);
          },
        },
      ],
    };

    const alert = await this.alertController.create(this.selectAlertBody);
    await alert.present();
    await alert.onDidDismiss();
    document.body.focus();
  }

  // async openSelectAlert(type: string) {
  //   if (
  //     type === 'priority' &&
  //     this.userDetails?.userRoleId === this.USER_ROLE_DESC.OWNER
  //   ) {
  //     if (this.showOpenAlertDropdown()) {
  //       this.selectAlertBody = {
  //         header: 'Change Task Priority',
  //         inputs: TASK_PRIORITY_DESC_ENUM.map((item: any) => ({
  //           type: 'radio',
  //           label: item.name,
  //           value: item.id,
  //         })),
  //         buttons: [
  //           { text: 'Cancel', role: 'cancel' },
  //           {
  //             text: 'Confirm',
  //             handler: (data) => {
  //               if (data) {
  //                 this.updateTaskDetails({ priorityId: data }, null);
  //               }
  //             },
  //           },
  //         ],
  //       };
  //     }
  //   } else if (type === 'status') {
  //     if (!this.showChangeStatusDropdown()) {
  //       return;
  //     }

  //     this.selectAlertBody = {
  //       header: 'Change Task Status',
  //       inputs: this.getTaskNextStatusesList(),
  //       buttons: [
  //         { text: 'Cancel', role: 'cancel' },
  //         {
  //           text: 'Confirm',
  //           handler: (data) => {
  //             if (data) {
  //               this.updateTaskDetails({ statusId: data }, null);
  //             }
  //           },
  //         },
  //       ],
  //     };
  //   } else if (
  //     type === 'staff' &&
  //     this.userDetails?.userRoleId === this.USER_ROLE_DESC.OWNER
  //   ) {
  //     if (this.showOpenAlertDropdown()) {
  //       const activeStaffsList = await this.getAllActiveStaffs();

  //       this.selectAlertBody = {
  //         header: 'Change Assigned Staff',
  //         inputs: activeStaffsList.map((item: any) => ({
  //           type: 'radio',
  //           label: item.name,
  //           value: item._id,
  //         })),
  //         buttons: [
  //           { text: 'Cancel', role: 'cancel' },
  //           {
  //             text: 'Confirm',
  //             handler: (data) => {
  //               if (data) {
  //                 this.assignTaskToStaff(data);
  //               }
  //             },
  //           },
  //         ],
  //       };
  //     }
  //   }

  //   const alert = await this.alertController.create(this.selectAlertBody);

  //   await alert.present();

  //   await alert.onDidDismiss();
  //   document.body.focus();
  // }

  getTaskNextStatusesList(): AppSelectInput[] {
    const statusMap = {
      [USER_ROLES_DESC.OWNER]: {
        [TASK_STATUS_ID_ENUM.READY]: [TASK_STATUS_ID_ENUM.IN_ANALYSIS],
        [TASK_STATUS_ID_ENUM.IN_ANALYSIS]: [
          TASK_STATUS_ID_ENUM.RE_OPEN,
          TASK_STATUS_ID_ENUM.DONE,
          TASK_STATUS_ID_ENUM.REJECTED,
        ],
      },
      [USER_ROLES_DESC.EMPLOYEE]: {
        [TASK_STATUS_ID_ENUM.ASSIGNED]: [TASK_STATUS_ID_ENUM.IN_PROGRESS],
        [TASK_STATUS_ID_ENUM.RE_OPEN]: [TASK_STATUS_ID_ENUM.IN_PROGRESS],
        [TASK_STATUS_ID_ENUM.IN_PROGRESS]: [TASK_STATUS_ID_ENUM.READY],
      },
    };

    const allowedStatuses =
      statusMap[this.userDetails.userRoleId]?.[this.taskDetails.statusId] || [];

    return TASK_STATUS_DESC_ENUM.filter((item: any) =>
      allowedStatuses.includes(item.id)
    ).map((item: any) => ({
      type: 'radio',
      label: item.name,
      value: item.id,
    }));
  }

  showChangeStatusDropdown(): boolean {
    const allowedStatuses = {
      [this.USER_ROLE_DESC.OWNER]: [
        TASK_STATUS_ID_ENUM.READY,
        TASK_STATUS_ID_ENUM.IN_ANALYSIS,
      ],
      [this.USER_ROLE_DESC.EMPLOYEE]: [
        TASK_STATUS_ID_ENUM.ASSIGNED,
        TASK_STATUS_ID_ENUM.IN_PROGRESS,
        TASK_STATUS_ID_ENUM.RE_OPEN,
      ],
    };

    return (
      allowedStatuses[this.userDetails.userRoleId]?.includes(
        this.taskDetails.statusId
      ) || false
    );
  }

  showOpenAlertDropdown() {
    if (
      [TASK_STATUS_ID_ENUM.DONE, TASK_STATUS_ID_ENUM.REJECTED].includes(
        this.taskDetails.statusId
      )
    ) {
      return false;
    }
    return true;
  }

  getAllActiveStaffs(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.staffsService.getAllStaffs({ isActive: true }).subscribe({
        next: (res: any) => resolve(res.success ? res.data : []),
        error: () => resolve([]),
      });
    });
  }

  assignTaskToStaff(staffId: string) {
    const reqBody = {
      taskId: this.taskDetails._id,
      staffId: staffId,
    };
    this.tasksService.assignTaskToStaff(reqBody).subscribe({
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

  onAddEditComment(reqBody: any) {
    if (reqBody.commentId) {
      this.editComment(reqBody);
    } else {
      this.addNewComment(reqBody);
    }
  }

  editComment(reqBody: any) {
    this.tasksService.editCommentOnTaskById(reqBody).subscribe({
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

  addNewComment(reqBody: any) {
    const formData = new FormData();
    formData.append('taskId', this.taskDetails._id);
    formData.append('comment', reqBody.comment);

    if (reqBody.files.length) {
      reqBody.files.forEach((item: any) => {
        formData.append('file', item.file);
      });
    }

    this.tasksService.addNewCommentOnTask(formData).subscribe({
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

  onDeleteComment(commentId: string) {
    this.tasksService.DeleteCommentById(commentId).subscribe({
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

  onRemoveAttachmentFromComment(reqBody: any) {
    this.tasksService.RemoveAttachmentFromComment(reqBody).subscribe({
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

  async onDeleteTask() {
    const isConfirmed = await this.alertService.presentAlert(
      'Delete Task?',
      'Deleting task would delete all its attachements and comments. Are you sure you want to perform this action?'
    );
    if (isConfirmed) {
      this.tasksService.deleteTaskById(this.taskDetails._id).subscribe({
        next: (res: any) => {
          if (res.success) {
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
