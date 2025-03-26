import { STATUS } from "./statusConstants.js";

export const ROLES = {
  PM: 0,
  DEV: 1,
  TEST: 2,
  BA: 3,
  USER: 4,
};
export const STATUS_PROJECT = {
  PROGRESSING: 0,
  DONE: 1,
  ARCHIVED: 2,
};
export const PRIORITY = {
  LOW: 0,
  MEDIUM: 1,
  HIGH: 2,
};
export const STATUS_TASK = {
  TO_DO: 0,
  IN_PROGRESS: 1,
  COMPLETED: 2,
  BLOCKED: 3,
};
export const STATUS_TASK_CHANGE = {
  TO_DO: 0,
  IN_PROGRESS: 1,
  COMPLETED: 2,
  BLOCKED: 3,
};
export const CHANGE_SOURCE = {
  MANUAL: 0,
  SYSTEM: 1,
  API: 2,
};
export const COMMENT = {
  TASK: "TASK",
  BUG: "BUG",
  STORY: "STORY",
};
export const STATUS_CODE = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER: 500,
};

export const PERMISSIONS = {
  ASSIGN_TASK: [ROLES.PM],

  CREATE_TASK: [ROLES.PM, ROLES.DEV, ROLES.TEST, ROLES.BA],
  UPDATE_TASK: [ROLES.PM, ROLES.DEV, ROLES.TEST, ROLES.BA],

  CREATE_COMMENT: [ROLES.PM, ROLES.DEV, ROLES.TEST, ROLES.BA],
  UPDATE_COMMENT: [ROLES.PM, ROLES.DEV, ROLES.TEST, ROLES.BA],

  TASK_STATUS_CHANGE: {
    [ROLES.PM] : Object.values(STATUS),
    [ROLES.DEV]: [STATUS.IN_PROGRESS, STATUS.FINISH],
    [ROLES.TEST]: [STATUS.TEST],
    [ROLES.BA]: [],
  },

  ADD_USER_TO_PROJECT: [ROLES.PM],
  REMOVE_USER_FROM_PROJECT: [ROLES.PM],

  CREATE_PROJECT: [ROLES.PM],
  UPDATE_PROJECT: [ROLES.PM],
  DELETE_PROJECT: [ROLES.PM],
};