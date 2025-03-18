import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SharedModule } from 'src/app/shared.module';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImagePickerComponent } from '../image-picker/image-picker.component';
import { FilesService } from 'src/app/services/files.service';

interface UploadFile {
  file: File | undefined;
  fileUrl: string | undefined;
}

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
  standalone: true,
  imports: [SharedModule, ImagePickerComponent],
})
export class ImageUploadComponent implements OnInit {

  uploadImageForm!: FormGroup;

  selectedFile: UploadFile = {
    file: undefined,
    fileUrl: undefined,
  };

  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private filesService: FilesService
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.uploadImageForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.minLength(5)]],
    });
  }

  onPickImage(file: File) {
    this.selectedFile.file = file;
    this.filesService.convertFileToDataUrl(file).then((dataUrl) => {
      this.selectedFile.fileUrl = dataUrl;
    });
  }

  onConfirmImageUpload() {
    const formData = new FormData();
    formData.append('images', this.selectedFile.file);
    formData.append('name', this.uploadImageForm.value.name);
    formData.append('description', this.uploadImageForm.value.description);

    this.sendSelectedImageFormData(formData);
  }

  sendSelectedImageFormData(formData: FormData) {}

  onCloseModal() {
    this.modalCtrl.dismiss();
  }

  get name() {
    return this.uploadImageForm?.get('name');
  }

  get description() {
    return this.uploadImageForm?.get('description');
  }

  onRemoveProfileImg() {
    this.selectedFile = {
      file: undefined,
      fileUrl: undefined,
    };
  }
}
