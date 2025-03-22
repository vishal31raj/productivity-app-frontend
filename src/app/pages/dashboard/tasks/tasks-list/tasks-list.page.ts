import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/shared.module';
import { TasksService } from '../tasks.service';
import { ToastService } from 'src/app/services/toast.service';
import { AppRoutingConstants } from 'src/app/constants/app-routing';
import { AuthService } from 'src/app/auth/auth.service';
import { StaffsService } from '../../staffs/staffs.service';
import { TaskCardComponent } from 'src/app/components/task-card/task-card.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.page.html',
  styleUrls: ['./tasks-list.page.scss'],
  standalone: true,
  imports: [SharedModule, TaskCardComponent],
})
export class TasksListPage implements OnInit {
  APP_ROUTES = AppRoutingConstants;

  isLoading: boolean;
  tasksList: any[];

  constructor(
    private authService: AuthService,
    private staffService: StaffsService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.getAllTasksAssignedToUser();
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      this.getAllTasksAssignedToUser();
      event.target.complete();
    }, 500);
  }

  getAllTasksAssignedToUser() {
    this.isLoading = true;
    this.authService.user.subscribe((user: any) => {
      if (user) {
        this.staffService.getTasksAssignedToStaff(user.userId).subscribe({
          next: (res: any) => {
            if (res.success) {
              this.tasksList = res.data;
              console.log(this.tasksList);

              this.isLoading = false;
            }
          },
          error: (err: any) => {
            this.toastService.showErrorToast(err.error.message);
            this.isLoading = false;
          },
        });
      }
    });
  }

  onTaskItemClick(taskId: string) {
    this.router.navigate([this.APP_ROUTES.TaskDetails + '/' + taskId]);
  }
}
