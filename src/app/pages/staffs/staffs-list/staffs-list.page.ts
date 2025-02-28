import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/shared.module';

@Component({
  selector: 'app-staffs-list',
  templateUrl: './staffs-list.page.html',
  styleUrls: ['./staffs-list.page.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class StaffsListPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
