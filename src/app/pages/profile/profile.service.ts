import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ROUTES } from 'src/app/constants/api-routes';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  getProfileDetails() {
    return this.http.get(API_ROUTES.GetProfileDetails);
  }

  changeProfileImgUrl(formData: FormData) {
    return this.http.put(API_ROUTES.ChangeProfileImg, formData);
  }

  resetPassword(reqBody: any) {
    return this.http.put(API_ROUTES.ResetPassword, reqBody);
  }
}
