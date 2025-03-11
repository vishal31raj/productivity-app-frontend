import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ROUTES } from 'src/app/constants/api-routes';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private http: HttpClient) {}

  createNewTask(formData: FormData) {
    return this.http.post(API_ROUTES.CreateNewTask, formData);
  }
}
