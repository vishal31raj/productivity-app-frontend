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

  editTaskDetails(taskId: string, reqBody: any) {
    return this.http.post(
      API_ROUTES.EditTaskDetailsById + '/' + taskId,
      reqBody
    );
  }

  getAllTasks(filters: any) {
    return this.http.post(API_ROUTES.GetAllTasks, filters);
  }

  getTaskDetails(taskId: string) {
    return this.http.get(API_ROUTES.GetTaskDetailsById + '/' + taskId);
  }

  AddAttachmentToTask(taskId: string, formData: FormData) {
    return this.http.post(
      API_ROUTES.AddAttachmentToTaskById + '/' + taskId,
      formData
    );
  }

  RemoveAttachmentFromTask(taskId: string, reqBody) {
    return this.http.post(
      API_ROUTES.RemoveAttachmentFromTaskById + '/' + taskId,
      reqBody
    );
  }

  deleteTaskById(taskId: string) {
    return this.http.delete(API_ROUTES.DeleteTaskById + '/' + taskId);
  }

  assignTaskToStaff(reqBody: any) {
    return this.http.post(API_ROUTES.AssignTaskToStaff, reqBody);
  }

  getAllCommentsByTaskId(taskId: string) {
    return this.http.get(API_ROUTES.GetAllCommentsByTaskId + '/' + taskId);
  }

  addNewCommentOnTask(formData: FormData) {
    return this.http.post(API_ROUTES.AddNewCommentOnTask, formData);
  }

  editCommentOnTaskById(reqBody: any) {
    return this.http.put(API_ROUTES.EditCommentById, reqBody);
  }

  RemoveAttachmentFromComment(reqBody: any) {
    return this.http.post(API_ROUTES.RemoveAttachmentFromCommentById, reqBody);
  }

  DeleteCommentById(commentId: string) {
    return this.http.delete(API_ROUTES.DeleteCommentById + '/' + commentId);
  }
}
