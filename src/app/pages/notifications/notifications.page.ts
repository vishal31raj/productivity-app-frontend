import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/shared.module';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class NotificationsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
