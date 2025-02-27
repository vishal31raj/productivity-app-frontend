import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';
import { HeaderPage } from '../shared/header/header.page';
import { SharedModule } from 'src/app/shared.module';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [SharedModule, HeaderPage],
})
export class DashboardPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
