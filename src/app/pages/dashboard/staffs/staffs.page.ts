import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/shared.module';

@Component({
  selector: 'app-staffs',
  templateUrl: './staffs.page.html',
  styleUrls: ['./staffs.page.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class StaffsPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
