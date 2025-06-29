import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { logoLaravel } from 'ionicons/icons';
import { API_ROUTES } from 'src/app/constants/api-routes';

@Injectable({
  providedIn: 'root',
})
export class AnnouncementService {
  constructor(private http: HttpClient) {}

  CreateNewBanner(formData: FormData) {
    return this.http.post(API_ROUTES.CreateNewBanner, formData);
  }
}
