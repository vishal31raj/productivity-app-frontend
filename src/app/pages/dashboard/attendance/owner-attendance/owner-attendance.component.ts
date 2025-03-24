import { Component, OnInit } from '@angular/core';
import moment from 'moment';
import { SharedModule } from 'src/app/shared.module';
import { AttendanceService } from '../attendance.service';
import { ToastService } from 'src/app/services/toast.service';
import { StaffsService } from '../../staffs/staffs.service';

@Component({
  selector: 'app-owner-attendance',
  templateUrl: './owner-attendance.component.html',
  styleUrls: ['./owner-attendance.component.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class OwnerAttendanceComponent implements OnInit {
  isLoading: boolean = false;
  selectedDate: string;
  currentDate = moment().format('YYYY-MM-DD')

  staffsArr: any[];
  showUpdateAttendanceBtn: boolean = false;
  isMarkingAttendance: boolean = false;

  constructor(
    private attendanceService: AttendanceService,
    private toastService: ToastService,
    private staffsService: StaffsService
  ) {}

  ngOnInit() {
    this.getAllActiveStaffs();
  }

  getAllActiveStaffs() {
    this.staffsService.getAllStaffs({ isActive: true }).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.staffsArr = res.data;
          this.onDateClick({
            detail: { value: this.currentDate },
          });
        }
      },
      error: (err: any) => {
        this.toastService.showErrorToast(err.error.message);
      },
    });
  }

  onDateClick(event: any) {
    this.showUpdateAttendanceBtn = false;
    this.selectedDate = moment(event.detail.value).format('YYYY-MM-DD');
    this.getAttendanceByDate(this.selectedDate);
  }

  getAttendanceByDate(date: string) {
    this.isLoading = true;
    this.attendanceService.getAllAttendanceByDate(date).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.staffsArr.forEach((staff: any) => {
            if (res.data.includes(staff._id)) {
              staff.isPresent = true;
            } else {
              staff.isPresent = false;
            }
          });
          this.isLoading = false;
        }
      },
      error: (err: any) => {
        this.toastService.showErrorToast(err.error.message);
        this.isLoading = false;
      },
    });
  }

  onCheckBoxClick(event: any) {
    this.showUpdateAttendanceBtn = true;
  }

  onUpdateAttendance() {
    const reqBody = {
      date: this.selectedDate,
      staffsIdArr: this.staffsArr
        .filter((item: any) => item.isPresent)
        .map((item: any) => item._id),
    };
    this.markOrUpdateAttendance(reqBody);
  }

  markOrUpdateAttendance(reqBody: any) {
    this.isMarkingAttendance = true;
    this.attendanceService.MarkOrUpdateStaffAttendance(reqBody).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.toastService.showSuccessToast(res.message);
          this.isMarkingAttendance = false;
          this.onDateClick({ detail: { value: reqBody.date } });
        }
      },
      error: (err: any) => {
        this.toastService.showErrorToast(err.error.message);
        this.isMarkingAttendance = false;
      },
    });
  }
}
