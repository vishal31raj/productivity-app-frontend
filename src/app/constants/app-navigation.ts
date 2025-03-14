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
    name: 'checklists',
    iconName: 'calendar',
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

export const SidebarNavigation = [
  {
    label: 'Help & Support',
    routerLink: AppRoutingConstants.HelpAndSupport,
    iconName: 'help-circle',
  },
];
