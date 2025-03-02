import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-avatar-image',
  templateUrl: './avatar-image.component.html',
  styleUrls: ['./avatar-image.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class AvatarImageComponent implements OnInit {
  @Input() imgUrl;
  @Input() width = '40px';
  @Input() height = '40px';

  constructor() {}

  ngOnInit() {}
}
