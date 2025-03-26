import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/shared.module';
import { NotificationsService } from './notifications.service';
import { ToastService } from 'src/app/services/toast.service';
import { RelativeTimePipe } from 'src/app/pipes/relative-time.pipe';
import { Router } from '@angular/router';
import { AppRoutingConstants } from 'src/app/constants/app-routing';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
  standalone: true,
  imports: [SharedModule, RelativeTimePipe],
})
export class NotificationsPage implements OnInit {
  APP_ROUTES = AppRoutingConstants;

  isLoading: boolean = false;
  notifications: any[];

  constructor(
    private notificationsService: NotificationsService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.getAllNotifications();
  }

  onNotificationItemClick(taskId: string) {
    if (taskId) {
      this.router.navigate([this.APP_ROUTES.TaskDetails + '/' + taskId]);
    }
  }

  getAllNotifications() {
    this.isLoading = true;
    this.notificationsService.GetAllNotifications().subscribe({
      next: (res: any) => {
        if (res.success === true) {
          this.notifications = res.data;
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
}
