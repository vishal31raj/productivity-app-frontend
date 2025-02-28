import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register.page').then((m) => m.RegisterPage),
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./pages/dashboard/dashboard.page').then((m) => m.DashboardPage),
  },
  {
    path: 'staffs',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./pages/staffs/staffs.page').then((m) => m.StaffsPage),
    children: [
      {
        path: '',
        redirectTo: 'staffs-list',
        pathMatch: 'full',
      },
      {
        path: 'staffs-list',
        loadComponent: () =>
          import('./pages/staffs/staffs-list/staffs-list.page').then(
            (m) => m.StaffsListPage
          ),
      },
      {
        path: 'create-new-staff',
        loadComponent: () =>
          import('./pages/staffs/create-new-staff/create-new-staff.page').then(
            (m) => m.CreateNewStaffPage
          ),
      },
    ],
  },
  {
    path: 'tasks',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./pages/tasks/tasks.page').then((m) => m.TasksPage),
    children: [
      {
        path: '',
        redirectTo: 'tasks-list',
        pathMatch: 'full',
      },
      {
        path: 'task-details',
        loadComponent: () =>
          import('./pages/tasks/task-details/task-details.page').then(
            (m) => m.TaskDetailsPage
          ),
      },
      {
        path: 'tasks-list',
        loadComponent: () =>
          import('./pages/tasks/tasks-list/tasks-list.page').then(
            (m) => m.TasksListPage
          ),
      },
      {
        path: 'create-new-task',
        loadComponent: () =>
          import('./pages/tasks/create-new-task/create-new-task.page').then(
            (m) => m.CreateNewTaskPage
          ),
      },
    ],
  },
  {
    path: 'community',
    canActivate: [AuthGuard],
    loadComponent: () => import('./pages/community/community.page').then( m => m.CommunityPage)
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    loadComponent: () => import('./pages/profile/profile.page').then( m => m.ProfilePage)
  },
  {
    path: 'help-n-support',
    canActivate: [AuthGuard],
    loadComponent: () => import('./pages/help-n-support/help-n-support.page').then( m => m.HelpNSupportPage)
  },
  {
    path: 'notifications',
    canActivate: [AuthGuard],
    loadComponent: () => import('./pages/notifications/notifications.page').then( m => m.NotificationsPage)
  },
];
