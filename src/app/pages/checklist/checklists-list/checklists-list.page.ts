import { Component, OnInit } from '@angular/core';
import { AppRoutingConstants } from 'src/app/constants/app-routing';
import { SharedModule } from 'src/app/shared.module';
import { TasksService } from '../../tasks/tasks.service';
import { ToastService } from 'src/app/services/toast.service';
import { ChecklistService } from '../checklist.service';

@Component({
  selector: 'app-checklists-list',
  templateUrl: './checklists-list.page.html',
  styleUrls: ['./checklists-list.page.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class ChecklistsListPage implements OnInit {
  APP_ROUTES = AppRoutingConstants;
  isLoading: boolean = false;
  filters = {
    pageNumber: null,
    pageSize: null,
    searchText: null,
  };

  checklists: any[] | undefined;

  constructor(
    private checklistService: ChecklistService,
    private toastService: ToastService
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.getAllChecklists();
  }

  getAllChecklists() {
    this.isLoading = true;
    this.checklistService.getAllCheckLists(this.filters).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.checklists = res.data;
          console.log(this.checklists);
          this.isLoading = false;
        }
      },
      error: (err: any) => {
        this.toastService.showErrorToast(err.error.message);
        this.isLoading = false;
      },
    });
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      this.getAllChecklists();
      event.target.complete();
    }, 500);
  }

  onSearchInput(event: any) {
    this.filters.searchText = event.target.value;
    this.getAllChecklists();
  }
}
