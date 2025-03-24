import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';
import { SharedModule } from 'src/app/shared.module';
import { AttendanceService } from '../attendance.service';
import moment from 'moment';

@Component({
  selector: 'app-staff-attendance',
  templateUrl: './staff-attendance.component.html',
  styleUrls: ['./staff-attendance.component.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class StaffAttendanceComponent implements OnInit {
  isLoading: boolean = false;
  isPresentDates: string[];
  currentDate = moment().format('YYYY-MM-DD');

  constructor(
    private attendanceService: AttendanceService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.getStaffAttendance();
  }

  getStaffAttendance() {
    this.isLoading = true;
    this.attendanceService.GetStaffAttendanceById().subscribe({
      next: (res: any) => {
        if (res.success) {
          this.isPresentDates = res.data.map((date: any) => ({
            date: moment(date).format('YYYY-MM-DD'),
            textColor: 'white',
            backgroundColor: 'green',
          }));
          this.isLoading = false;
        }
      },
      error: (err: any) => {
        this.toastService.showErrorToast(err.error.message);
        this.isLoading = false;
      },
    });
  }
}
