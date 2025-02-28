import { AppRoutingConstants } from 'src/app/constants/app-routing';

export const FooterNavigation = [
  {
    name: 'dashboard',
    iconName: 'grid',
    label: 'Dashboard',
    routerLink: AppRoutingConstants.Dashboard,
  },
  {
    name: 'staffs',
    iconName: 'people',
    label: 'Staffs',
    routerLink: AppRoutingConstants.StaffList,
  },
  {
    name: 'tasks',
    iconName: 'calendar',
    label: 'Tasks',
    routerLink: AppRoutingConstants.TasksList,
  },
  {
    name: 'community',
    iconName: 'newspaper',
    label: 'Community',
    routerLink: AppRoutingConstants.Community,
  },
];

export const SidebarNavigation = [
  {
    label: 'Help & Support',
    routerLink: AppRoutingConstants.HelpAndSupport,
    iconName: 'chatbubble-ellipses',
  },
];
