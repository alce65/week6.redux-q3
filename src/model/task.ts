export type WithId = {
  id: number;
};

export type TaskNoId = {
  title: string;
  owner: string;
  isCompleted: boolean;
};

export type Task = WithId & TaskNoId;
