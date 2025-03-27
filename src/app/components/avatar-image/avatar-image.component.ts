import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FilesService } from 'src/app/services/files.service';

@Component({
  selector: 'app-avatar-image',
  templateUrl: './avatar-image.component.html',
  styleUrls: ['./avatar-image.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class AvatarImageComponent implements OnInit {
  @Input() docUrl;
  @Input() width = '40px';
  @Input() height = '40px';

  constructor(private filesService: FilesService) {}

  ngOnChanges() {
    if (this.docUrl) {
      this.docUrl = this.filesService.formatImageUrl(this.docUrl);
    }
  }

  ngOnInit() {}
}
