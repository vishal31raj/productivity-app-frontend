import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from 'src/app/shared.module';
import { CommunityService } from './community.service';
import { ToastService } from 'src/app/services/toast.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { RelativeTimePipe } from 'src/app/pipes/relative-time.pipe';
import { FilesService } from 'src/app/services/files.service';

@Component({
  selector: 'app-community',
  templateUrl: './community.page.html',
  styleUrls: ['./community.page.scss'],
  standalone: true,
  imports: [SharedModule, QuillModule, RelativeTimePipe],
})
export class CommunityPage implements OnInit {
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  quillConfig = {
    theme: 'snow',
    placeholder: 'Write something...',
    modules: {
      toolbar: [
        ['bold', 'italic', 'underline'],
        // [{ header: [1, 2, false] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        // [{ align: [] }],
        ['link', 'image', 'video'],
      ],
    },
  };

  filters = {
    pageNumber: 1,
    pageSize: 25,
  };

  isLoading: boolean = false;
  messages: any[] = [];

  isEditorActive: boolean = false;
  newMessageForm = new FormGroup({
    newMessage: new FormControl('', Validators.required),
  });

  constructor(
    private communityService: CommunityService,
    private toastService: ToastService,
    private filesService: FilesService
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.getAllMessages();
  }

  getAllMessages() {
    this.communityService.getAllMessages(this.filters).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.messages = res.data;
          if (this.messages.length) {
            this.messages.forEach((item: any) => {
              item.sender.profileImgUrl = this.filesService.formatImageUrl(
                item.sender.profileImgUrl
              );
            });
          }
          console.log(this.messages);
          this.scrollToBottom();
        }
      },
      error: (err: any) => {
        this.toastService.showErrorToast(err.error.message);
      },
    });
  }

  onSendMessage() {
    if (this.newMessageForm.valid) {
      this.communityService
        .sendNewMessage(this.newMessageForm.value)
        .subscribe({
          next: (res: any) => {
            if (res.success) {
              this.newMessageForm.reset();
              this.isEditorActive = false;
              this.getAllMessages();
            }
            console.log(res);
          },
          error: (err: any) => {
            this.toastService.showErrorToast(err.error.message);
          },
        });
    }
  }

  activateEditor() {
    this.isEditorActive = true;
    this.scrollToBottom();
  }

  scrollToBottom() {
    setTimeout(() => {
      if (this.messagesContainer) {
        this.messagesContainer.nativeElement.scrollTop =
          this.messagesContainer.nativeElement.scrollHeight;
      }
    }, 100);
  }
}
