import { Injectable } from '@angular/core';
import { Browser } from '@capacitor/browser';

import { environment } from 'src/environments/environment';
const BASE_URL = environment.BASE_URL;

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  constructor() {}

  formatImageUrl(imageUrl: string | null) {
    return imageUrl ? `${BASE_URL}/${imageUrl}` : 'https://ionicframework.com/docs/img/demos/avatar.svg';
  }

  async openImage(imageUrl: string) {
    try {
      await Browser.open({ url: imageUrl });
    } catch (error) {
      console.error('Failed to open image:', error);
    }
  }

  convertFileToDataUrl(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  }
}
