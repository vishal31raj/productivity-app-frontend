import { StatusChipInterface } from '../components/status-chip/status-chip.component';

export const TASK_STATUS_ID_ENUM = {
  NEW: 1,
  ASSIGNED: 2,
  IN_PROGRESS: 3,
  READY: 4,
  IN_ANALYSIS: 5,
  RE_OPEN: 6,
  DONE: 7,
  REJECTED: 8,
};

export const TASK_STATUS_DESC_ENUM: StatusChipInterface[] = [
  {
    id: TASK_STATUS_ID_ENUM.NEW,
    name: 'New',
    cssClass: 'gray',
  },
  {
    id: TASK_STATUS_ID_ENUM.ASSIGNED,
    name: 'Assigned',
    cssClass: 'teal',
  },
  {
    id: TASK_STATUS_ID_ENUM.IN_PROGRESS,
    name: 'In Progress',
    cssClass: 'yellow',
  },
  {
    id: TASK_STATUS_ID_ENUM.READY,
    name: 'Ready',
    cssClass: 'blue',
  },
  {
    id: TASK_STATUS_ID_ENUM.IN_ANALYSIS,
    name: 'In Analysis',
    cssClass: 'orange',
  },
  {
    id: TASK_STATUS_ID_ENUM.RE_OPEN,
    name: 'Re-Open',
    cssClass: 'maroon',
  },
  {
    id: TASK_STATUS_ID_ENUM.DONE,
    name: 'Done',
    cssClass: 'green',
  },
  {
    id: TASK_STATUS_ID_ENUM.REJECTED,
    name: 'Rejected',
    cssClass: 'red',
  },
];

export const TASK_PRIORITY_ID_ENUM = {
  LOW: 1,
  MEDIUM: 2,
  HIGH: 3,
};

export const TASK_PRIORITY_DESC_ENUM = [
  {
    id: TASK_PRIORITY_ID_ENUM.LOW,
    name: 'Low',
    cssClass: 'low',
  },
  {
    id: TASK_PRIORITY_ID_ENUM.MEDIUM,
    name: 'Medium',
    cssClass: 'medium',
  },
  {
    id: TASK_PRIORITY_ID_ENUM.HIGH,
    name: 'High',
    cssClass: 'high',
  },
];
