import { Component, OnInit } from '@angular/core';
import { AppRoutingConstants } from 'src/app/constants/app-routing';
import { SharedModule } from 'src/app/shared.module';
import { StaffsService } from '../staffs.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-staffs-list',
  templateUrl: './staffs-list.page.html',
  styleUrls: ['./staffs-list.page.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class StaffsListPage implements OnInit {
  APP_ROUTES = AppRoutingConstants;

  isLoading: boolean | undefined;
  filters = {
    pageNumber: undefined,
    pageSize: undefined,
    isActive: undefined,
    searchText: undefined,
  };
  staffsList: any[] | undefined;

  constructor(
    private staffsService: StaffsService,
    private toastService: ToastService
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.getStaffsList();
  }

  getStaffsList() {
    this.isLoading = true;
    this.staffsService.getAllStaffs(this.filters).subscribe({
      next: (res: any) => {
        if (res.success === true) {
          this.staffsList = res.data;
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
      this.getStaffsList();
      event.target.complete();
    }, 500);
  }

  onSearchInput(event: any) {
    this.filters.searchText = event.target.value;
    this.getStaffsList();
  }
}
