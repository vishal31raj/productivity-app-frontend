import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import moment from 'moment';
import { QuillModule } from 'ngx-quill';
import { DatetimePickerComponent } from 'src/app/components/datetime-picker/datetime-picker.component';
import { QuillConfig } from 'src/app/constants/quill-config';
import { BANNER_TYPE_ARR } from 'src/app/enums/banner-type.enum';
import { SharedModule } from 'src/app/shared.module';
import { AnnouncementService } from './announcement.service';
import { ToastService } from 'src/app/services/toast.service';
import { Router } from '@angular/router';
import { AppRoutingConstants } from 'src/app/constants/app-routing';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.page.html',
  styleUrls: ['./announcement.page.scss'],
  standalone: true,
  imports: [
    SharedModule,
    QuillModule,
    DatetimePickerComponent,
  ],
})
export class AnnouncementPage implements OnInit {
  quillConfig = QuillConfig;
  typesArr = BANNER_TYPE_ARR;
  APP_ROUTES = AppRoutingConstants;

  createAnnouncementForm!: FormGroup;
  currentDateTime = moment().format('YYYY-MM-DDTHH:mm:ss');

  constructor(
    private _fb: FormBuilder,
    private annService: AnnouncementService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm(): void {
    this.createAnnouncementForm = this._fb.group({
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
      description: ['', Validators.minLength(5)],
      type: [null, Validators.required],
    });
  }

  onDateChanged(event, type) {
    if (type === 'startDate') {
      this.createAnnouncementForm.patchValue({ startDate: event });
    } else if (type === 'endDate') {
      this.createAnnouncementForm.patchValue({ endDate: event });
    }
  }

  onSubmitForm() {
    if (this.createAnnouncementForm.valid) {
      const formData = new FormData();
      formData.append('startDate', this.createAnnouncementForm.value.startDate);
      formData.append('endDate', this.createAnnouncementForm.value.endDate);
      formData.append(
        'description',
        this.createAnnouncementForm.value.description
      );
      formData.append('type', this.createAnnouncementForm.value.type);

      this.createAnnouncement(formData);
    }
  }

  createAnnouncement(formData: FormData) {
    this.annService.CreateNewBanner(formData).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.toastService.showSuccessToast(res.message);
          this.createAnnouncementForm.reset();
          this.router.navigate([this.APP_ROUTES.Analytics]);
        }
      },
      error: (err: any) => {
        this.toastService.showErrorToast(err.error.message);
      },
    });
  }

  get startDate() {
    return this.createAnnouncementForm?.get('startDate');
  }

  get endDate() {
    return this.createAnnouncementForm?.get('endDate');
  }

  get description() {
    return this.createAnnouncementForm?.get('description');
  }

  get type() {
    return this.createAnnouncementForm?.get('type');
  }
}
