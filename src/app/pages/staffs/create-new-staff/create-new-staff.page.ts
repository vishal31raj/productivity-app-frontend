import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/shared.module';

@Component({
  selector: 'app-create-new-staff',
  templateUrl: './create-new-staff.page.html',
  styleUrls: ['./create-new-staff.page.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class CreateNewStaffPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
