import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { Router } from '@angular/router';
import { SharedModule } from 'src/app/shared.module';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class LoginPage implements OnInit {
  isApiRunning: boolean = false;
  loginForm!: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initializeLoginForm();
  }

  initializeLoginForm() {
    this.loginForm = this._fb.group({
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{10}$')],
      ],
      password: ['', [Validators.required]],
    });
  }

  onLoginConfirm() {
    if (this.loginForm.valid) {
      this.isApiRunning = true;
      this.authService.login(this.loginForm.value).subscribe({
        next: (res: any) => {
          this.toastService.showSuccessToast(res.message);
          this.loginForm.reset();
          this.isApiRunning = false;
          this.router.navigate(['/dashboard']);
        },
        error: (err: any) => {
          this.toastService.showErrorToast(err.error.message);
          this.isApiRunning = false;
        },
      });
    }
  }

  get password() {
    return this.loginForm?.get('password');
  }

  get phoneNumber() {
    return this.loginForm?.get('phoneNumber');
  }
}
