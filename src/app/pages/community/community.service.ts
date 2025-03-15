import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ROUTES } from 'src/app/constants/api-routes';

@Injectable({
  providedIn: 'root',
})
export class CommunityService {
  constructor(private http: HttpClient) {}

  getAllMessages(filters: any) {
    return this.http.post(API_ROUTES.GetAllMessages, filters);
  }

  sendNewMessage(reqBody: any) {
    return this.http.post(API_ROUTES.SendNewMessage, reqBody);
  }
}
