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
  @Output() deleteCommentEvent: EventEmitter<any> = new EventEmitter();
  @Output() removeAttachmentFromCommentEvent: EventEmitter<any> =
    new EventEmitter();

  isActionSheetOpen: boolean = false;
  public actionSheetButtons = [
    {
      text: 'Edit',
      data: {
        action: 'edit',
      },
      handler: () => {
        this.onAddEditComponent();
      },
    },
    {
      text: 'Delete',
      role: 'destructive',
      data: {
        action: 'delete',
      },
      handler: () => {
        this.deleteCommentEvent.emit(this.selectedComment._id);
      },
    },
  ];

  selectedComment: any;

  constructor(
    private filesService: FilesService,
    private modalController: ModalController
  ) {}

  ngOnInit() {}

  onOpenImage(docUrl: string) {
    this.filesService.openImage(docUrl);
  }

  openActionSheet(comment: any) {
    this.selectedComment = comment;
    this.isActionSheetOpen = true;
  }

  async onAddEditComponent() {
    const modal = await this.modalController.create({
      component: AddEditCommentComponent,
      initialBreakpoint: 0.75,
      breakpoints: [0, 0.75, 1],
      componentProps: {
        comment: this.selectedComment,
        onCloseModal: async (event: any) => {
          await modal.dismiss();
          this.selectedComment = undefined;
        },
        getAddEditCommentReqBody: async (reqBody) => {
          this.addEditCommentEvent.emit(reqBody);
          await modal.dismiss();
          this.selectedComment = undefined;
        },
        removeAttachmentFromComment: async (reqBody) => {
          this.removeAttachmentFromCommentEvent.emit(reqBody);
          await modal.dismiss();
          this.selectedComment = undefined;
        },
      },
    });

    await modal.present();
  }
}
