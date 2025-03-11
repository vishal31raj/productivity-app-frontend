import { Component, Input, OnInit } from '@angular/core';
import { TASK_PRIORITY_ID_ENUM } from 'src/app/enums/tasks.enum';
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

  getTaskPriority() {
    return TASK_PRIORITY_ID_ENUM[this.priorityId] + ' Priority';
  }

  getPriorityClass(): string {
    return this.priorityId === 1 ? 'low' : this.priorityId === 2 ? 'medium' : 'high';
  }
}
