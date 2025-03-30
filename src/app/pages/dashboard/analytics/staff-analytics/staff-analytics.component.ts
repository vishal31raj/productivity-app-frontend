import { Component, OnInit } from '@angular/core';
import { AnalyticsCardComponent } from 'src/app/components/analytics-card/analytics-card.component';
import { SharedModule } from 'src/app/shared.module';
import { AnalyticsService } from '../analytics.service';
import { ToastService } from 'src/app/services/toast.service';
import { BannerComponent } from 'src/app/components/banner/banner.component';

@Component({
  selector: 'app-staff-analytics',
  templateUrl: './staff-analytics.component.html',
  styleUrls: ['./staff-analytics.component.scss'],
  standalone: true,
  imports: [SharedModule, AnalyticsCardComponent, BannerComponent],
})
export class StaffAnalyticsComponent implements OnInit {
  isLoading: boolean = false;
  staffAnalytics: any;

  constructor(
    private analyticsService: AnalyticsService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.getStaffAnalytics();
  }

  getStaffAnalytics() {
    this.isLoading = true;
    this.analyticsService.GetStaffAnalytics().subscribe({
      next: (res: any) => {
        if (res.success) {
          this.staffAnalytics = res.data;
          this.isLoading = false;
        }
      },
      error: (err: any) => {
        this.toastService.showErrorToast(err.error.message);
        this.isLoading = false;
      },
    });
  }
}
