import { Component, OnInit } from '@angular/core';
import { AnalyticsCardComponent } from 'src/app/components/analytics-card/analytics-card.component';
import { SharedModule } from 'src/app/shared.module';

@Component({
  selector: 'app-staff-analytics',
  templateUrl: './staff-analytics.component.html',
  styleUrls: ['./staff-analytics.component.scss'],
  standalone: true,
  imports: [SharedModule, AnalyticsCardComponent],
})
export class StaffAnalyticsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
