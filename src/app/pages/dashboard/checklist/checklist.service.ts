import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { logoLaravel } from 'ionicons/icons';
import { API_ROUTES } from 'src/app/constants/api-routes';

@Injectable({
  providedIn: 'root',
})
export class ChecklistService {
  constructor(private http: HttpClient) {}

  getAllCheckLists(filters: any) {
    return this.http.post(API_ROUTES.GetAllChecklists, filters);
  }

  createNewChecklist(formData: FormData) {
    return this.http.post(API_ROUTES.CreateNewCheckList, formData);
  }

  GetChecklistDetailsById(checklistId: string) {
    return this.http.get(
      API_ROUTES.GetChecklistDetailsById + '/' + checklistId
    );
  }

  EditChecklistDetailsById(checklistId: string, reqBody) {
    return this.http.put(
      API_ROUTES.EditChecklistDetailsById + '/' + checklistId,
      reqBody
    );
  }

  AddAttachmentToChecklistById(checklistId: string, formData: FormData) {
    return this.http.post(
      API_ROUTES.AddAttachmentToChecklistById + '/' + checklistId,
      formData
    );
  }

  RemoveAttachmentFromChecklistById(checklistId: string, reqBody) {
    return this.http.post(
      API_ROUTES.RemoveAttachmentFromChecklistById + '/' + checklistId,
      reqBody
    );
  }

  DeleteChecklistById(checklistId: string) {
    return this.http.delete(API_ROUTES.DeleteCheckListById + '/' + checklistId);
  }
}
