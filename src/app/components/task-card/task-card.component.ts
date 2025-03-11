import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/shared.module';
import { TASK_STATUS_DESC_ENUM } from 'src/app/enums/tasks.enum';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class TaskCardComponent implements OnInit {
  @Input() taskDetails: any;

  TaskStatusDescEnum = TASK_STATUS_DESC_ENUM;

  constructor() {}

  ngOnInit() {}
}
