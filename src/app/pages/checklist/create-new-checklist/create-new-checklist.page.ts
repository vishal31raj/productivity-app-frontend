import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/shared.module';

@Component({
  selector: 'app-create-new-checklist',
  templateUrl: './create-new-checklist.page.html',
  styleUrls: ['./create-new-checklist.page.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class CreateNewChecklistPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
