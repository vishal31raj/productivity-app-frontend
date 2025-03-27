import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AllowedFileType } from 'src/app/constants/file-types';
import { FilesService } from 'src/app/services/files.service';
import { SharedModule } from 'src/app/shared.module';

@Component({
  selector: 'app-selected-file',
  templateUrl: './selected-file.component.html',
  styleUrls: ['./selected-file.component.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class SelectedFileComponent implements OnInit {
  @Input() selectedFile: File;
  @Input() showRemoveBtn: boolean = false;
  // @Input() showDeleteBtn: boolean = false;
  @Input() fileFooterText: string;

  @Output() removeBtnClick: EventEmitter<any> = new EventEmitter();
  // @Output() deleteBtnClick: EventEmitter<any> = new EventEmitter();

  imgUrl: string;

  constructor(private filesService: FilesService) {}

  ngOnChanges() {
    this.getSelectedFileType();
  }

  getSelectedFileType() {
    for (let fileType of AllowedFileType) {
      if (fileType.types.includes(this.selectedFile.type)) {
        // this.fileType = fileType.iconPath;
        if (fileType.iconPath === 'image') {
          this.filesService
            .convertFileToDataUrl(this.selectedFile)
            .then((dataUrl) => {
              this.imgUrl = dataUrl;
            });
        } else {
          this.imgUrl = fileType.iconPath;
        }
        return;
      }
    }
  }

  ngOnInit() {}

  onRemoveBtnClick() {
    this.removeBtnClick.emit();
  }

  // onDeleteBtnClick() {
  //   this.deleteBtnClick.emit();
  // }
}
