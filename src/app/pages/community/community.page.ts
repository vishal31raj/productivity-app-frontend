import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/shared.module';

@Component({
  selector: 'app-community',
  templateUrl: './community.page.html',
  styleUrls: ['./community.page.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class CommunityPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
