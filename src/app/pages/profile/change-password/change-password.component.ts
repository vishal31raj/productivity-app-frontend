import { Component, Input, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/shared.module';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm!: FormGroup;

  constructor(
    private modalController: ModalController,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.changePasswordForm = this.fb.group({
      oldPassword: ['', [Validators.required, Validators.minLength(5)]],
      newPassword: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  onConfirmChangePassword() {
    if (this.changePasswordForm.valid) {
      this.changePassword(this.changePasswordForm.value);
    }
  }

  changePassword(reqBody: any) {}

  get oldPassword() {
    return this.changePasswordForm?.get('oldPassword');
  }

  get newPassword() {
    return this.changePasswordForm?.get('newPassword');
  }

  onCloseModal() {
    this.modalController.dismiss();
  }
}
