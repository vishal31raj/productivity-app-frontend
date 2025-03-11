import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

export interface StatusChipInterface {
  id: number;
  name: string;
  cssClass: string;
}

@Component({
  selector: 'app-status-chip',
  templateUrl: './status-chip.component.html',
  styleUrls: ['./status-chip.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class StatusChipComponent implements OnInit {
  @Input() statusId: number;
  @Input() statusDescArr: StatusChipInterface[];

  constructor() {}

  ngOnInit() {}

  getStatusLabel() {
    return this.statusDescArr.find((item: any) => item.id === this.statusId);
  }
}
