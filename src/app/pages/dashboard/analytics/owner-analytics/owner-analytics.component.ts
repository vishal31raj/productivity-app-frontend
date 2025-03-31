import { Component, OnInit } from '@angular/core';
import { AnalyticsCardComponent } from 'src/app/components/analytics-card/analytics-card.component';
import { BannerComponent } from 'src/app/components/banner/banner.component';
import { SharedModule } from 'src/app/shared.module';
import { AnalyticsService } from '../analytics.service';
import { ToastService } from 'src/app/services/toast.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-owner-analytics',
  templateUrl: './owner-analytics.component.html',
  styleUrls: ['./owner-analytics.component.scss'],
  standalone: true,
  imports: [SharedModule, AnalyticsCardComponent, BannerComponent],
})
export class OwnerAnalyticsComponent implements OnInit {
  isLoading: boolean = false;
  ownerAnalytics: any;

  topPerformersList: any[] = [
    {
      id: 1,
      name: 'Sanket',
      percentage: '90%',
    },
    {
      id: 2,
      name: 'Drishty',
      percentage: '85%',
    },
  ];

  constructor(
    private analyticsService: AnalyticsService,
    private toastService: ToastService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.getOwnerAnalytics();
  }

  getOwnerAnalytics() {
    this.isLoading = true;
    this.analyticsService.GetOwnerAnalytics().subscribe({
      next: (res: any) => {
        if (res.success) {
          this.ownerAnalytics = res.data;
          this.isLoading = false;
        }
      },
      error: (err: any) => {
        this.toastService.showErrorToast(err.error.message);
        this.isLoading = false;
      },
    });
  }

  async onDeleteBanner() {
    const isConfirmed = await this.alertService.presentAlert(
      'Remove banner?',
      "Are you sure you want to remove this banner from everyone's wall?"
    );

    if (isConfirmed) {
      this.analyticsService.DeleteBanner().subscribe({
        next: (res: any) => {
          if (res.success) {
            this.toastService.showSuccessToast(res.message);
            this.getOwnerAnalytics();
          }
        },
        error: (err: any) => {
          this.toastService.showErrorToast(err.error.message);
        },
      });
    }
  }
}
