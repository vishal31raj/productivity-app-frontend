import { Component, Input, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/shared.module';
import { StaffsService } from '../../staffs.service';
import { ToastService } from 'src/app/services/toast.service';
import { TaskCardComponent } from 'src/app/components/task-card/task-card.component';
import { AppRoutingConstants } from 'src/app/constants/app-routing';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  standalone: true,
  imports: [SharedModule, TaskCardComponent],
})
export class TasksComponent implements OnInit {
  APP_ROUTES = AppRoutingConstants;
  @Input() staffId: string;

  tasksList: any[];

  constructor(
    private staffsService: StaffsService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnChanges() {
    this.getAllTasksAssignedToStaff();
  }

  ngOnInit() {}

  getAllTasksAssignedToStaff() {
    this.staffsService.getTasksAssignedToStaff(this.staffId).subscribe({
      next: (res: any) => {
        if (res.success === true) {
          this.tasksList = res.data;
        }
      },
      error: (err: any) => {
        this.toastService.showErrorToast(err.error.message);
      },
    });
  }

  onTaskItemClick(taskId: string) {
    this.router.navigate([this.APP_ROUTES.TaskDetails + '/' + taskId]);
  }
}
