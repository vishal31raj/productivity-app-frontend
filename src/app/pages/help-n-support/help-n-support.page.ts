import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/shared.module';

@Component({
  selector: 'app-help-n-support',
  templateUrl: './help-n-support.page.html',
  styleUrls: ['./help-n-support.page.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class HelpNSupportPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
