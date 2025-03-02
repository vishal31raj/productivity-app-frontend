import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/shared.module';
import { StaffsService } from '../staffs.service';
import { ToastService } from 'src/app/services/toast.service';
import { Router } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { TasksComponent } from './tasks/tasks.component';

@Component({
  selector: 'app-staff-details',
  templateUrl: './staff-details.page.html',
  styleUrls: ['./staff-details.page.scss'],
  standalone: true,
  imports: [SharedModule, DetailsComponent, TasksComponent],
})
export class StaffDetailsPage implements OnInit {
  isLoading: boolean | undefined;
  staffDetails: any;
  selectedTab = 'details';

  constructor(
    private staffsService: StaffsService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.getStaffDetails(this.router.url.split('/')[2]);
  }

  getStaffDetails(id: string) {
    this.isLoading = true;
    this.staffsService.getStaffDetailsById(id).subscribe({
      next: (res: any) => {
        if (res.success === true) {
          this.staffDetails = res.data;
          console.log(this.staffDetails);
          this.isLoading = false;
        }
      },
      error: (err: any) => {
        this.toastService.showErrorToast(err.error.message);
        this.isLoading = false;
      },
    });
  }

  onSwitchTabEvent(event: any) {
    this.selectedTab = event.target.value;
  }
}
