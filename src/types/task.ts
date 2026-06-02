export type Task = {
  id: string;
  title: string;
  description: string;
  date: string;
  completed: boolean;
  checked: boolean;
};

export type TaskResponse = Omit<Task, 'id'>;
