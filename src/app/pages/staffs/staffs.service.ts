import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ROUTES } from 'src/app/constants/api-routes';

@Injectable({
  providedIn: 'root',
})
export class StaffsService {
  constructor(private http: HttpClient) {}

  createNewStaff(reqBody: any) {
    return this.http.post(API_ROUTES.CreateStaff, reqBody);
  }

  getAllStaffs(filters: any) {
    return this.http.post(API_ROUTES.GetAllStaffs, filters);
  }

  getStaffDetailsById(id: string) {
    return this.http.get(API_ROUTES.GetStaffDetailsById + '/' + id);
  }

  changeActiveStatus(id: string, newStatus: boolean) {
    return this.http.put(API_ROUTES.ChangeStaffActiveStatus + '/' + id, {
      isActive: newStatus,
    });
  }

  addDocumentToUser(id: string, formData: FormData) {
    return this.http.put(API_ROUTES.AddDocumentToUser + '/' + id, formData);
  }

  removeDocumentFromUser(id: string, docId: string) {
    return this.http.put(API_ROUTES.RemoveDocumentFromUser + '/' + id, {
      documentId: docId,
    });
  }
}
