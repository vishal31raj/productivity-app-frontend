import { StatusChipInterface } from '../components/status-chip/status-chip.component';

export const TASK_STATUS_ID_ENUM = {
  NEW: 1,
  ASSIGNED: 2,
  IN_PROGRESS: 3,
  READY: 4,
  IN_ANALYSIS: 5,
  RE_OPEN: 6,
  DONE: 7,
  REJECTED: 8
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
  1: 'LOW',
  2: 'MEDIUM',
  3: 'HIGH',
};
