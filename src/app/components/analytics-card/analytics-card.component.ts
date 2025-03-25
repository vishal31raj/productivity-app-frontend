import { Component, Input, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/shared.module';

@Component({
  selector: 'app-analytics-card',
  templateUrl: './analytics-card.component.html',
  styleUrls: ['./analytics-card.component.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class AnalyticsCardComponent implements OnInit {
  @Input() count: string;
  @Input() header: string;
  @Input() subHeader: string;

  constructor() {}

  ngOnInit() {}
}
