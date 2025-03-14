export const API_ROUTES = {
  // Auth
  UserLogin: '/auth/user-login',
  ForgotPassword: '/auth/forgotPassword',

  // Staffs
  CreateStaff: '/user/createStaff',
  GetAllStaffs: '/user/getAllStaffs',
  GetStaffDetailsById: '/user/getStaffDetailsById',
  ChangeStaffActiveStatus: '/user/changeStaffActiveStatus',
  AddDocumentToUser: '/user/addDocumentToUserById',
  RemoveDocumentFromUser: '/user/removeDocumentFromUserById',
  DeleteStaffById: '/user/deleteStaffById',
  ResetPassword: '/user/resetPassword',
  GetProfileDetails: '/user/getProfileDetails',
  ChangeProfileImg: '/user/changeProfileImgUrl',

  // Checklists
  CreateNewCheckList: '/tasks/createNewChecklist',
  GetAllChecklists: '/tasks/getAllChecklists',
  GetChecklistDetailsById: '/tasks/getChecklistDetailsById',
  EditChecklistDetailsById: '/tasks/editChecklistDetailsById',
  AddAttachmentToChecklistById: '/tasks/addAttachmentToChecklistById',
  RemoveAttachmentFromChecklistById: '/tasks/removeAttachmentFromChecklistById',
  DeleteCheckListById: '/tasks/deleteCheckListById',

  // Tasks
  CreateNewTask: '/tasks/createNewTask',
  GetAllTasks: '/tasks/getAllTasks',
  GetTaskDetailsById: '/tasks/getTaskDetailsById',
  EditTaskDetailsById: '/tasks/editTaskDetailsById',
  AddAttachmentToTaskById: '/tasks/addAttachmentToTaskById',
  RemoveAttachmentFromTaskById: '/tasks/removeAttachmentFromTaskById',
  DeleteTaskById: '/tasks/deleteTaskById',

  // Comments
  GetAllCommentsByTaskId: '/tasks/getAllCommentsByTaskId',
  AddNewCommentOnTask: '/tasks/addNewCommentOnTask',
  EditCommentById: '/tasks/editCommentById',
  RemoveAttachmentFromCommentById: '/tasks/removeAttachmentFromCommentById',
  DeleteCommentById: '/tasks/deleteCommentById',

  // Assign
  AssignTaskToStaff: '/tasks/assignTaskToStaff',
  GetTasksAssignedToStaff: '/tasks/getTasksAssignedToStaff',
};
