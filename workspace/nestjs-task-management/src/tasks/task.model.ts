/*
    This defines the shape of the Task model.
    We can use either interface or class.
    'export' this model so that it can be used outside this file.
*/
export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}
