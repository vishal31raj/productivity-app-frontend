import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImagePickerComponent } from 'src/app/components/image-picker/image-picker.component';
import { AppRoutingConstants } from 'src/app/constants/app-routing';
import { SharedModule } from 'src/app/shared.module';
import { UploadFileInterface } from '../../checklist/create-new-checklist/create-new-checklist.page';
import { FilesService } from 'src/app/services/files.service';
import { ToastService } from 'src/app/services/toast.service';
import { Router } from '@angular/router';
import { TasksService } from '../tasks.service';
import { QuillConfig } from 'src/app/constants/quill-config';
import { QuillModule } from 'ngx-quill';

@Component({
  selector: 'app-create-new-task',
  templateUrl: './create-new-task.page.html',
  styleUrls: ['./create-new-task.page.scss'],
  standalone: true,
  imports: [SharedModule, ImagePickerComponent, QuillModule],
})
export class CreateNewTaskPage implements OnInit {
  APP_ROUTES = AppRoutingConstants;
  quillConfig = QuillConfig;

  isLoading: boolean = false;
  createNewTaskForm!: FormGroup;

  selectedFiles: UploadFileInterface[] = [];

  constructor(
    private fb: FormBuilder,
    private filesService: FilesService,
    private tasksService: TasksService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.createNewTaskForm = this.fb.group({
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

  onRemoveImg(lastModified: number) {
    this.selectedFiles = this.selectedFiles.filter(
      (item: any) => item.file.lastModified !== lastModified
    );
  }

  onConfirmCreateTask() {
    if (this.createNewTaskForm.valid) {
      const formData = new FormData();
      formData.append('title', this.createNewTaskForm.value.title);
      formData.append('description', this.createNewTaskForm.value.description);
      formData.append('checklistId', this.router.url.split('/')[4]);

      if (this.selectedFiles.length) {
        this.selectedFiles.forEach((item: any) => {
          formData.append('images', item.file);
        });
      }

      this.createTask(formData);
    }
  }

  createTask(formData: FormData) {
    this.isLoading = true;
    this.tasksService.createNewTask(formData).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.toastService.showSuccessToast(res.message);
          this.isLoading = false;
          this.createNewTaskForm.reset();
          this.router.navigate([this.APP_ROUTES.TaskDetails + '/' + res.data]);
        }
      },
      error: (err: any) => {
        this.toastService.showErrorToast(err.error.message);
        this.isLoading = false;
      },
    });
  }

  get title() {
    return this.createNewTaskForm?.get('name');
  }

  get description() {
    return this.createNewTaskForm?.get('description');
  }
}
