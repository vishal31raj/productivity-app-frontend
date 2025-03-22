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

export const StaffFooterNavigation = [
  {
    name: 'analytics',
    iconName: 'grid',
    label: 'Analytics',
    routerLink: AppRoutingConstants.Analytics,
  },
  {
    name: 'tasks',
    iconName: 'calendar',
    label: 'Tasks',
    routerLink: AppRoutingConstants.StaffTasksList,
  },
  // {
  //   name: 'staffs',
  //   iconName: 'people',
  //   label: 'Staffs',
  //   routerLink: AppRoutingConstants.StaffList,
  // },

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
