export const API_ROUTES = {
  // Auth
  UserLogin: '/auth/user-login',
  ResetPassword: '/auth/resetPassword',
  ForgotPassword: '/auth/forgotPassword',
  GetProfileDetails: '/auth/getUserProfileDetails',
  ChangeProfileImg: '/auth/changeProfileImg',

  // Staffs
  CreateStaff: '/user/createStaff',
  GetAllStaffs: '/user/getAllStaffs',
  GetStaffDetailsById: '/user/getStaffDetailsById',
  ChangeStaffActiveStatus: '/user/changeStaffActiveStatus',
  AddDocumentToUser: '/user/addDocumentToUserById',
  RemoveDocumentFromUser: '/user/removeDocumentFromUserById',
};
