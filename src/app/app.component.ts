import { Component } from '@angular/core';
import { SharedModule } from './shared.module';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [SharedModule],
  standalone: true,
})
export class AppComponent {
  constructor() {}

  ngOnInit() {}
}
