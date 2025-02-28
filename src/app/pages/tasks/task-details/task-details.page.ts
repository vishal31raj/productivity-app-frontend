import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/shared.module';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.page.html',
  styleUrls: ['./task-details.page.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class TaskDetailsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
