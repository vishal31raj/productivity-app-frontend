import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RelativeTimePipe } from 'src/app/pipes/relative-time.pipe';
import { FilesService } from 'src/app/services/files.service';
import { SharedModule } from 'src/app/shared.module';
import { ModalController } from '@ionic/angular';
import { AddEditCommentComponent } from './add-edit-comment/add-edit-comment.component';

@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.scss'],
  standalone: true,
  imports: [SharedModule, RelativeTimePipe],
})
export class CommentSectionComponent implements OnInit {
  @Input() comments: any[];
  @Output() addEditCommentEvent: EventEmitter<any> = new EventEmitter();

  constructor(
    private filesService: FilesService,
    private modalController: ModalController
  ) {}

  ngOnChanges() {
    console.log('comments', this.comments);
  }

  ngOnInit() {}

  onOpenImage(imgUrl: string) {
    this.filesService.openImage(imgUrl);
  }

  async onAddEditComponent(comment: any) {
    const modal = await this.modalController.create({
      component: AddEditCommentComponent,
      initialBreakpoint: 0.75,
      breakpoints: [0, 0.75, 1],
      componentProps: {
        comment: comment,
        onCloseModal: async (event: any) => {
          await modal.dismiss();
        },
        getAddEditCommentReqBody: async (reqBody) => {
          this.addEditCommentEvent.emit(reqBody);
          await modal.dismiss();
        },
      },
    });

    await modal.present();
  }
}
