import { Component, Input, OnInit } from '@angular/core';
import {
  TASK_PRIORITY_DESC_ENUM,
  TASK_PRIORITY_ID_ENUM,
} from 'src/app/enums/tasks.enum';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-priority-badge',
  templateUrl: './priority-badge.component.html',
  styleUrls: ['./priority-badge.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class PriorityBadgeComponent implements OnInit {
  @Input() priorityId: number;

  constructor() {}

  ngOnInit() {}

  getPriorityClass() {
    return TASK_PRIORITY_DESC_ENUM.find(
      (item: any) => item.id === this.priorityId
    );
  }
}
