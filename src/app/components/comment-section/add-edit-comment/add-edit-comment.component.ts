import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from 'src/app/shared.module';
import { ImagePickerComponent } from '../../image-picker/image-picker.component';
import { UploadFileInterface } from 'src/app/pages/checklist/create-new-checklist/create-new-checklist.page';
import { FilesService } from 'src/app/services/files.service';

@Component({
  selector: 'app-add-edit-comment',
  templateUrl: './add-edit-comment.component.html',
  styleUrls: ['./add-edit-comment.component.scss'],
  standalone: true,
  imports: [SharedModule, ImagePickerComponent],
})
export class AddEditCommentComponent implements OnInit {
  addEditCommentForm!: FormGroup;

  selectedFiles: UploadFileInterface[] = [];

  constructor(private fb: FormBuilder, private filesService: FilesService) {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.addEditCommentForm = this.fb.group({
      comment: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  onPickImage(file: File) {
    const newFile: UploadFileInterface = { file, fileUrl: undefined };
    this.filesService.convertFileToDataUrl(file).then((dataUrl) => {
      newFile.fileUrl = dataUrl;
      this.selectedFiles.push(newFile);
      console.log(this.selectedFiles);
    });
  }

  onRemoveImg(lastModified: number) {
    this.selectedFiles = this.selectedFiles.filter(
      (item: any) => item.file.lastModified !== lastModified
    );
  }

  onConfirmAddEditComment() {
    if (this.addEditCommentForm.valid) {
      const reqBody = {
        ...this.addEditCommentForm.value,
        files: this.selectedFiles,
      };
      this.getAddEditCommentReqBody(reqBody);
    }
  }

  getAddEditCommentReqBody(reqBody) {}

  get commentControl() {
    return this.addEditCommentForm?.get('comment');
  }

  onCloseModal() {}
}
