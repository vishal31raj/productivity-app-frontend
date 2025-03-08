import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/shared.module';

@Component({
  selector: 'app-checklist-details',
  templateUrl: './checklist-details.page.html',
  styleUrls: ['./checklist-details.page.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class ChecklistDetailsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
