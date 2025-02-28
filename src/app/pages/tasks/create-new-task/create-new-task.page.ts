import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/shared.module';

@Component({
  selector: 'app-create-new-task',
  templateUrl: './create-new-task.page.html',
  styleUrls: ['./create-new-task.page.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class CreateNewTaskPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
