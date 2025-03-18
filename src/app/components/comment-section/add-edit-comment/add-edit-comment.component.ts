import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from 'src/app/shared.module';
import { ImagePickerComponent } from '../../image-picker/image-picker.component';
import { UploadFileInterface } from 'src/app/pages/checklist/create-new-checklist/create-new-checklist.page';
import { FilesService } from 'src/app/services/files.service';
import { QuillConfig } from 'src/app/constants/quill-config';
import { QuillModule } from 'ngx-quill';

@Component({
  selector: 'app-add-edit-comment',
  templateUrl: './add-edit-comment.component.html',
  styleUrls: ['./add-edit-comment.component.scss'],
  standalone: true,
  imports: [SharedModule, ImagePickerComponent, QuillModule],
})
export class AddEditCommentComponent implements OnInit {
  quillConfig = QuillConfig;

  @Input() comment: any;
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
    if (this.comment) {
      this.addEditCommentForm.patchValue({ comment: this.comment.comment });
      if (this.comment.attachments.length) {
        this.selectedFiles = this.comment.attachments;
      }
    }
  }

  onPickImage(file: File) {
    const newFile: UploadFileInterface = { file, fileUrl: undefined };
    this.filesService.convertFileToDataUrl(file).then((dataUrl) => {
      newFile.fileUrl = dataUrl;
      this.selectedFiles.push(newFile);
    });
  }

  onRemoveImg(lastModified?: number, itemId?: string) {
    if (this.comment) {
      this.removeAttachmentFromComment({
        commentId: this.comment._id,
        attachmentId: itemId,
      });
    } else {
      this.selectedFiles = this.selectedFiles.filter(
        (item: any) => item.file.lastModified !== lastModified
      );
    }
  }

  onConfirmAddEditComment() {
    if (this.addEditCommentForm.valid) {
      let reqBody;

      if (this.comment) {
        reqBody = {
          newComment: this.addEditCommentForm.value.comment,
          commentId: this.comment._id,
        };
      } else {
        reqBody = {
          ...this.addEditCommentForm.value,
          files: this.selectedFiles,
        };
      }

      this.getAddEditCommentReqBody(reqBody);
    }
  }

  getAddEditCommentReqBody(reqBody) {}

  removeAttachmentFromComment(reqBody) {}

  get commentControl() {
    return this.addEditCommentForm?.get('comment');
  }

  onCloseModal() {}
}
