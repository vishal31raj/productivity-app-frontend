import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/shared.module';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.page.html',
  styleUrls: ['./tasks-list.page.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class TasksListPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
