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
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./pages/dashboard/dashboard.page').then((m) => m.DashboardPage),
    children: [
      {
        path: '',
        redirectTo: 'analytics',
        pathMatch: 'full',
      },
      {
        path: 'analytics',
        loadComponent: () =>
          import('./pages/dashboard/analytics/analytics.page').then(
            (m) => m.AnalyticsPage
          ),
      },
      {
        path: 'announcement',
        loadComponent: () =>
          import('./pages/dashboard/announcement/announcement.page').then(
            (m) => m.AnnouncementPage
          ),
      },
      {
        path: 'staffs',
        loadComponent: () =>
          import('./pages/dashboard/staffs/staffs.page').then(
            (m) => m.StaffsPage
          ),
        children: [
          {
            path: '',
            redirectTo: 'staffs-list',
            pathMatch: 'full',
          },
          {
            path: 'staffs-list',
            loadComponent: () =>
              import(
                './pages/dashboard/staffs/staffs-list/staffs-list.page'
              ).then((m) => m.StaffsListPage),
          },
          {
            path: 'create-new-staff',
            loadComponent: () =>
              import(
                './pages/dashboard/staffs/create-new-staff/create-new-staff.page'
              ).then((m) => m.CreateNewStaffPage),
          },
          {
            path: 'details/:id',
            loadComponent: () =>
              import(
                './pages/dashboard/staffs/staff-details/staff-details.page'
              ).then((m) => m.StaffDetailsPage),
          },
        ],
      },
      {
        path: 'tasks',

        loadComponent: () =>
          import('./pages/dashboard/tasks/tasks.page').then((m) => m.TasksPage),
        children: [
          {
            path: '',
            redirectTo: 'tasks-list',
            pathMatch: 'full',
          },
          {
            path: 'task-details/:id',
            loadComponent: () =>
              import(
                './pages/dashboard/tasks/task-details/task-details.page'
              ).then((m) => m.TaskDetailsPage),
          },
          {
            path: 'tasks-list',
            loadComponent: () =>
              import('./pages/dashboard/tasks/tasks-list/tasks-list.page').then(
                (m) => m.TasksListPage
              ),
          },
          {
            path: 'create-new-task/:checklistId',
            loadComponent: () =>
              import(
                './pages/dashboard/tasks/create-new-task/create-new-task.page'
              ).then((m) => m.CreateNewTaskPage),
          },
        ],
      },
      {
        path: 'community',
        loadComponent: () =>
          import('./pages/dashboard/community/community.page').then(
            (m) => m.CommunityPage
          ),
      },
      {
        path: 'profile',

        loadComponent: () =>
          import('./pages/dashboard/profile/profile.page').then(
            (m) => m.ProfilePage
          ),
      },
      {
        path: 'help-n-support',

        loadComponent: () =>
          import('./pages/dashboard/help-n-support/help-n-support.page').then(
            (m) => m.HelpNSupportPage
          ),
      },
      {
        path: 'notifications',

        loadComponent: () =>
          import('./pages/dashboard/notifications/notifications.page').then(
            (m) => m.NotificationsPage
          ),
      },
      {
        path: 'checklists',
        loadComponent: () =>
          import('./pages/dashboard/checklist/checklist.page').then(
            (m) => m.ChecklistPage
          ),
        children: [
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full',
          },
          {
            path: 'list',
            loadComponent: () =>
              import(
                './pages/dashboard/checklist/checklists-list/checklists-list.page'
              ).then((m) => m.ChecklistsListPage),
          },
          {
            path: 'create-new-checklist',
            loadComponent: () =>
              import(
                './pages/dashboard/checklist/create-new-checklist/create-new-checklist.page'
              ).then((m) => m.CreateNewChecklistPage),
          },
          {
            path: 'checklist-details/:checklistId',
            loadComponent: () =>
              import(
                './pages/dashboard/checklist/checklist-details/checklist-details.page'
              ).then((m) => m.ChecklistDetailsPage),
          },
        ],
      },
      {
        path: 'attendance',
        loadComponent: () =>
          import('./pages/dashboard/attendance/attendance.page').then(
            (m) => m.AttendancePage
          ),
      },
    ],
  },
];
