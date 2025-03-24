import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ROUTES } from 'src/app/constants/api-routes';

@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  constructor(private http: HttpClient) {}

  getAllAttendanceByDate(date: string) {
    return this.http.get(`${API_ROUTES.GetAllAttendanceByDate}?date=${date}`);
  }

  MarkOrUpdateStaffAttendance(reqBody: any) {
    return this.http.post(API_ROUTES.MarkOrUpdateStaffAttendance, reqBody);
  }

  GetStaffAttendanceById(staffId?: string) {
    let url = API_ROUTES.GetStaffAttendanceById;
    if (staffId) {
      url = url.concat('?staffId=' + staffId);
    }
    return this.http.get(url);
  }
}
