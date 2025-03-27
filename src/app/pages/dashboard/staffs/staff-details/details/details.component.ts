import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SharedModule } from 'src/app/shared.module';
import { ModalController } from '@ionic/angular';
import { ImageUploadComponent } from 'src/app/components/image-upload/image-upload.component';
import { StaffsService } from '../../staffs.service';
import { ToastService } from 'src/app/services/toast.service';

import { environment } from 'src/environments/environment';
import { AlertService } from 'src/app/services/alert.service';
const BASE_URL = environment.BASE_URL;

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class DetailsComponent implements OnInit {
  @Input() staffDetails: any;
  @Output() updateStaffDetails: EventEmitter<void> = new EventEmitter();

  constructor(
    private modalCtrl: ModalController,
    private toastService: ToastService,
    private staffsService: StaffsService,
    private alertService: AlertService
  ) {}

  ngOnInit() {}

  async openAddDocumentModal() {
    const modal = await this.modalCtrl.create({
      component: ImageUploadComponent,
      componentProps: {
        sendSelectedImageFormData: (event: any) => {
          this.uploadDocToStaff(event);
        },
      },
      breakpoints: [0, 1],
      initialBreakpoint: 1,
    });

    await modal.present();
  }

  uploadDocToStaff(event: any) {
    this.staffsService
      .addDocumentToUser(this.staffDetails._id, event)
      .subscribe({
        next: (res: any) => {
          if (res.success === true) {
            this.toastService.showSuccessToast(res.message);
            this.modalCtrl.dismiss();
            this.updateStaffDetails.emit();
          }
        },
        error: (err: any) => {
          this.toastService.showErrorToast(err.error.message);
        },
      });
  }

  onOpenDoc(docUrl: string) {
    let url = BASE_URL + '/' + docUrl;
    window.open(url, '_blank');
  }

  async onRemoveDocument(docId: string) {
    const isConfirmed = await this.alertService.presentAlert(
      'Delete document?',
      'Are you sure you want to delete this document'
    );
    if (isConfirmed) {
      this.removeDocFromUser(docId);
    }
  }

  removeDocFromUser(docId: string) {
    this.staffsService
      .removeDocumentFromUser(this.staffDetails._id, docId)
      .subscribe({
        next: (res: any) => {
          if (res.success === true) {
            this.toastService.showSuccessToast(res.message);
            this.updateStaffDetails.emit();
          }
        },
        error: (err: any) => {
          this.toastService.showErrorToast(err.error.message);
        },
      });
  }
}
