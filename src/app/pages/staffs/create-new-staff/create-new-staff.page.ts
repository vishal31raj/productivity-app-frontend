import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/services/toast.service';
import { SharedModule } from 'src/app/shared.module';
import { StaffsService } from '../staffs.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-new-staff',
  templateUrl: './create-new-staff.page.html',
  styleUrls: ['./create-new-staff.page.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class CreateNewStaffPage implements OnInit {
  createNewStaffForm!: FormGroup;

  isApiRunning: boolean = false;

  constructor(
    private toastService: ToastService,
    private fb: FormBuilder,
    private staffsService: StaffsService,
    private location: Location
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  ionViewWillEnter() {}

  initializeForm() {
    this.createNewStaffForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{10}$')],
      ],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  onCreateStaff() {
    if (this.createNewStaffForm.valid) {
      this.isApiRunning = true;
      this.staffsService
        .createNewStaff(this.createNewStaffForm.value)
        .subscribe({
          next: (res: any) => {
            if (res.success === true) {
              this.toastService.showSuccessToast(res.message);
              this.isApiRunning = false;
              this.location.back();
            }
          },
          error: (err: any) => {
            this.toastService.showErrorToast(err.error.message);
            this.isApiRunning = false;
          },
        });
    }
  }

  get name() {
    return this.createNewStaffForm?.get('name');
  }

  get phoneNumber() {
    return this.createNewStaffForm?.get('phoneNumber');
  }

  get whatsappNumber() {
    return this.createNewStaffForm?.get('whatsappNumber');
  }

  get email() {
    return this.createNewStaffForm?.get('email');
  }

  get gender() {
    return this.createNewStaffForm?.get('gender');
  }

  get dateOfBirth() {
    return this.createNewStaffForm?.get('dateOfBirth');
  }

  get password() {
    return this.createNewStaffForm?.get('password');
  }
}
