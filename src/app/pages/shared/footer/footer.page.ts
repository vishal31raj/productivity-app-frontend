import { Component, OnInit } from '@angular/core';
import { FooterNavigation } from 'src/app/constants/app-navigation';
import { SharedModule } from 'src/app/shared.module';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.page.html',
  styleUrls: ['./footer.page.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class FooterPage implements OnInit {
  footerNavItems = FooterNavigation;

  constructor() {}

  ngOnInit() {}
}
