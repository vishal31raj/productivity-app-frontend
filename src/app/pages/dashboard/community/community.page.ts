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
import { QuillConfig } from 'src/app/constants/quill-config';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-community',
  templateUrl: './community.page.html',
  styleUrls: ['./community.page.scss'],
  standalone: true,
  imports: [SharedModule, QuillModule, RelativeTimePipe],
})
export class CommunityPage implements OnInit {
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  quillConfig = QuillConfig;

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

  isActionSheetOpen: boolean = false;
  selectedChat: any;
  public actionSheetButtons: any[] = [];

  messageSub: Subscription;

  constructor(
    private communityService: CommunityService,
    private toastService: ToastService,
    private socketService: SocketService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.socketConnection();
  }

  socketConnection() {
    this.messageSub = this.socketService.message$.subscribe((event: any) => {
      if (event && event.action === 'newMessage') {
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

  onOpenMenuTab(message: any) {
    this.selectedChat = message;

    this.actionSheetButtons = [
      {
        text: this.selectedChat.isImportant
          ? 'Remove as Important'
          : 'Mark as Important',
        data: {
          action: 'mark',
        },
        handler: () => {
          this.markAsImportant();
        },
      },
      {
        text: 'Delete',
        role: 'destructive',
        data: {
          action: 'delete',
        },
        handler: () => {
          this.deleteChatById();
        },
      },
    ];

    this.isActionSheetOpen = true;
  }

  async deleteChatById() {
    const isConfirmed = await this.alertService.presentAlert(
      'Delete your message?',
      'Are you sure you want to delete this message?'
    );
    if (isConfirmed) {
      this.communityService.deleteMessage(this.selectedChat._id).subscribe({
        next: (res: any) => {
          if (res.success) {
            this.toastService.showSuccessToast(res.message);
            const index = this.messages.findIndex(
              (item) => item._id === this.selectedChat._id
            );
            if (index !== -1) {
              this.messages.splice(index, 1);
              this.messages = [...this.messages];
            }

            this.selectedChat = undefined;
          }
        },
        error: (err: any) => {
          this.toastService.showErrorToast(err.error.message);
        },
      });
    }
  }

  async markAsImportant() {
    this.communityService
      .editMessage(this.selectedChat._id, {
        isImportant: !this.selectedChat.isImportant,
      })
      .subscribe({
        next: (res: any) => {
          if (res.success) {
            this.toastService.showSuccessToast(res.message);

            const index = this.messages.findIndex(
              (msg) => msg._id === this.selectedChat._id
            );

            if (index !== -1) {
              this.messages[index].isImportant =
                !this.messages[index].isImportant;
            }

            this.selectedChat = undefined;
          }
        },
        error: (err: any) => {
          this.toastService.showErrorToast(err.error.message);
        },
      });
  }
}
