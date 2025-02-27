import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toastOptions: any = {
    duration: 1500,
  };

  constructor(private toastController: ToastController) {}

  async showSuccessToast(message: string) {
    const toast = await this.toastController.create({
      ...this.toastOptions,
      message: message,
      cssClass: 'success-toast',
    });

    await toast.present();
  }

  async showErrorToast(message: string) {
    const toast = await this.toastController.create({
      ...this.toastOptions,
      message: message,
      cssClass: 'error-toast',
    });

    await toast.present();
  }
}
