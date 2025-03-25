import { Component, OnInit } from '@angular/core';
import { AnalyticsCardComponent } from 'src/app/components/analytics-card/analytics-card.component';
import { SharedModule } from 'src/app/shared.module';

@Component({
  selector: 'app-owner-analytics',
  templateUrl: './owner-analytics.component.html',
  styleUrls: ['./owner-analytics.component.scss'],
  standalone: true,
  imports: [SharedModule, AnalyticsCardComponent],
})
export class OwnerAnalyticsComponent implements OnInit {
  topPerformersList: any[] = [
    {
      id: 1,
      name: 'Sanket',
      percentage: '90%'
    },
    {
      id: 2,
      name: 'Drishty',
      percentage: '85%'
    },
  ];

  constructor() {}

  ngOnInit() {}
}
