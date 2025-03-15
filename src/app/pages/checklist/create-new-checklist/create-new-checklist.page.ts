import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImagePickerComponent } from 'src/app/components/image-picker/image-picker.component';
import { FilesService } from 'src/app/services/files.service';
import { SharedModule } from 'src/app/shared.module';
import { ChecklistService } from '../checklist.service';
import { ToastService } from 'src/app/services/toast.service';
import { AppRoutingConstants } from 'src/app/constants/app-routing';
import { Router } from '@angular/router';
import { QuillModule } from 'ngx-quill';

export interface UploadFileInterface {
  file: File | undefined;
  fileUrl: string | undefined;

  _id?: string;
  imgUrl?: string;
}

@Component({
  selector: 'app-create-new-checklist',
  templateUrl: './create-new-checklist.page.html',
  styleUrls: ['./create-new-checklist.page.scss'],
  standalone: true,
  imports: [SharedModule, ImagePickerComponent, QuillModule],
})
export class CreateNewChecklistPage implements OnInit {
  APP_ROUTES = AppRoutingConstants;
  isLoading: boolean = false;
  createNewChecklistForm!: FormGroup;

  selectedFiles: UploadFileInterface[] = [];

  constructor(
    private fb: FormBuilder,
    private filesService: FilesService,
    private checklistService: ChecklistService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.createNewChecklistForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.minLength(5)]],
    });
  }

  onPickImage(file: File) {
    const newFile: UploadFileInterface = { file, fileUrl: undefined };
    this.filesService.convertFileToDataUrl(file).then((dataUrl) => {
      newFile.fileUrl = dataUrl;
      this.selectedFiles.push(newFile);
    });
  }

  onRemoveProfileImg(lastModified: number) {
    this.selectedFiles = this.selectedFiles.filter(
      (item: any) => item.file.lastModified !== lastModified
    );
  }

  onConfirmCreateCheckList() {
    console.log(this.createNewChecklistForm.value)

    // if (this.createNewChecklistForm.valid) {
    //   const formData = new FormData();
    //   formData.append('title', this.createNewChecklistForm.value.title);
    //   formData.append(
    //     'description',
    //     this.createNewChecklistForm.value.description
    //   );

    //   if (this.selectedFiles.length) {
    //     this.selectedFiles.forEach((item: any) => {
    //       formData.append('images', item.file);
    //     });
    //   }

    //   this.createCheckList(formData);
    // }
  }

  createCheckList(formData: FormData) {
    this.isLoading = true;
    this.checklistService.createNewChecklist(formData).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.toastService.showSuccessToast(res.message);
          this.isLoading = false;
          this.createNewChecklistForm.reset();
          this.router.navigate([
            this.APP_ROUTES.ChecklistDetails + '/' + res.data,
          ]);
        }
      },
      error: (err: any) => {
        this.toastService.showErrorToast(err.error.message);
        this.isLoading = false;
      },
    });
  }

  get title() {
    return this.createNewChecklistForm?.get('name');
  }

  get description() {
    return this.createNewChecklistForm?.get('description');
  }
}
