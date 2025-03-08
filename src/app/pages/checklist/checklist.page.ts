import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/shared.module';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.page.html',
  styleUrls: ['./checklist.page.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class ChecklistPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
