import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { logoLaravel } from 'ionicons/icons';
import { API_ROUTES } from 'src/app/constants/api-routes';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  constructor(private http: HttpClient) {}

  GetOwnerAnalytics() {
    return this.http.get(API_ROUTES.GetOwnerAnalytics);
  }

  GetStaffAnalytics() {
    return this.http.get(API_ROUTES.GetStaffAnalytics);
  }

  DeleteBanner() {
    return this.http.delete(API_ROUTES.DeleteBanner);
  }
}
