import { AppRoutingConstants } from 'src/app/constants/app-routing';

export const OwnerFooterNavigation = [
  {
    name: 'analytics',
    iconName: 'grid',
    label: 'Analytics',
    routerLink: AppRoutingConstants.Analytics,
  },
  {
    name: 'staffs',
    iconName: 'people',
    label: 'Staffs',
    routerLink: AppRoutingConstants.StaffList,
  },
  {
    name: 'checklists',
    iconName: 'document-text',
    label: 'Checklists',
    routerLink: AppRoutingConstants.ChecklistsList,
  },
  {
    name: 'community',
    iconName: 'chatbubble-ellipses',
    label: 'Community',
    routerLink: AppRoutingConstants.Community,
  },
];

export const StaffFooterNavigation = [
  {
    name: 'analytics',
    iconName: 'grid',
    label: 'Analytics',
    routerLink: AppRoutingConstants.Analytics,
  },
  {
    name: 'tasks',
    iconName: 'document-text',
    label: 'Tasks',
    routerLink: AppRoutingConstants.StaffTasksList,
  },
  {
    name: 'attendance',
    iconName: 'calendar',
    label: 'Attendance',
    routerLink: AppRoutingConstants.Attendance,
  },
  {
    name: 'community',
    iconName: 'chatbubble-ellipses',
    label: 'Community',
    routerLink: AppRoutingConstants.Community,
  },
];

export const OwnerSidebarNavItems = [
  {
    iconName: 'calendar',
    label: 'Attendance',
    routerLink: AppRoutingConstants.Attendance,
  },
  {
    iconName: 'megaphone',
    label: 'Announcement',
    routerLink: AppRoutingConstants.Announcement,
  },
  {
    label: 'Help & Support',
    routerLink: AppRoutingConstants.HelpAndSupport,
    iconName: 'help-circle',
  },
];

export const StaffSidebarNavItems = [
  {
    label: 'Help & Support',
    routerLink: AppRoutingConstants.HelpAndSupport,
    iconName: 'help-circle',
  },
];
