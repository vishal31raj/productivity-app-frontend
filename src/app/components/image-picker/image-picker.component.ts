import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { ToastService } from 'src/app/services/toast.service';
import { SharedModule } from 'src/app/shared.module';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class ImagePickerComponent implements OnInit {
  @Input() buttonName: string | null = 'Select Image';
  @Input() disabled: boolean = false;

  @Output() imgPickedEvent = new EventEmitter();

  cameraOptions = {
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.Base64,
  };

  constructor(private _toastService: ToastService) {}

  ngOnInit() {}

  async openCamera() {
    if (!Capacitor.isPluginAvailable('Camera')) {
      this._toastService.showErrorToast(
        'Camera is not available on this device.'
      );
      return;
    }

    try {
      const image = await Camera.getPhoto(this.cameraOptions);
      const base64Data = image.base64String;
      const blob = this.base64ToBlob(base64Data!, 'image/jpeg');
      const file = new File([blob], 'photo.jpg', { type: 'image/jpeg' });

      this.imgPickedEvent.emit(file); // Emitting the file object
    } catch (err) {
      this._toastService.showErrorToast("Couldn't get an image!");
    }
  }

  base64ToBlob(base64Data: string, contentType: string): Blob {
    const byteCharacters = atob(base64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
  }
}
