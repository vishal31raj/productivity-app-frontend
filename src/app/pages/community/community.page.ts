import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from 'src/app/shared.module';
import { CommunityService } from './community.service';
import { ToastService } from 'src/app/services/toast.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { RelativeTimePipe } from 'src/app/pipes/relative-time.pipe';
import { FilesService } from 'src/app/services/files.service';
import { Subscription } from 'rxjs';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-community',
  templateUrl: './community.page.html',
  styleUrls: ['./community.page.scss'],
  standalone: true,
  imports: [SharedModule, QuillModule, RelativeTimePipe],
})
export class CommunityPage implements OnInit {
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  isActionSheetOpen: boolean = false;
  public actionSheetButtons = [
    {
      text: 'Mark as Important',
      data: {
        action: 'mark',
      },
      handler: () => {
        // this.onAddEditComponent();
      },
    },
    {
      text: 'Edit',
      data: {
        action: 'edit',
      },
      handler: () => {
        // this.onAddEditComponent();
      },
    },
    {
      text: 'Delete',
      role: 'destructive',
      data: {
        action: 'delete',
      },
      handler: () => {
        // this.deleteCommentEvent.emit(this.selectedComment._id);
      },
    },
  ];

  quillConfig = {
    theme: 'snow',
    placeholder: 'Write something...',
    modules: {
      toolbar: [
        ['bold', 'italic', 'underline'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image', 'video'],
      ],
    },
  };

  filters = {
    pageNumber: 1,
    pageSize: 10,
  };

  messages: any[] = [];
  isFetchingMore: boolean = false;

  isEditorActive: boolean = false;
  newMessageForm = new FormGroup({
    newMessage: new FormControl('', Validators.required),
  });

  private messageSub: Subscription;

  constructor(
    private communityService: CommunityService,
    private toastService: ToastService,
    private filesService: FilesService,
    private socketService: SocketService
  ) {}

  ngOnInit() {
    this.socketConnection();
  }

  socketConnection() {
    this.messageSub = this.socketService.message$.subscribe((event: any) => {
      if (event && event.action === 'newMessage') {
        if (event.message.sender.profileImgUrl) {
          event.message.sender.profileImgUrl = this.filesService.formatImageUrl(
            event.message.sender.profileImgUrl
          );
        }
        this.messages.push(event.message);
        this.scrollToBottom();
      }
    });
  }

  ionViewWillEnter() {
    this.filters.pageNumber = 1;
    this.getAllMessages();
  }

  getAllMessages(prepend: boolean = false) {
    if (this.isFetchingMore) {
      return;
    }
    this.isFetchingMore = true;

    this.communityService.getAllMessages(this.filters).subscribe({
      next: (res: any) => {
        if (res.success) {
          let newMessages = res.data.map((item: any) => ({
            ...item,
            sender: {
              ...item.sender,
              profileImgUrl: this.filesService.formatImageUrl(
                item.sender.profileImgUrl
              ),
            },
          }));

          if (prepend) {
            this.messages = [...newMessages, ...this.messages];
          } else {
            this.messages = newMessages;
            this.scrollToBottom();
          }
        }
        this.isFetchingMore = false;
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
              this.filters.pageNumber = 1;
              this.getAllMessages(false);
            }
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

  onScroll(event: any) {
    const scrollTop = event.target.scrollTop;
    if (scrollTop === 0 && !this.isFetchingMore) {
      this.filters.pageNumber += 1;
      this.getAllMessages(true);
    }
  }
}
