import api from '../firebase';
import type { Task, TaskResponse } from '../types/task';

type TasksByID = Record<string, Task>;

class TasksService {
  async getTasks(): Promise<TasksByID> {
    const response = await api.get<TasksByID | null>('/tasks.json');
    return response.data ?? {};
  }

  async addTask(task: TaskResponse): Promise<{ name: string }> {
    const response = await api.post<{ name: string }>('/tasks.json', task);
    return response.data;
  }

  async updateTask(id: string, task: Partial<Task>): Promise<void> {
    await api.patch(`/tasks/${id}.json`, task);
  }

  async deleteTask(id: string): Promise<void> {
    await api.delete(`/tasks/${id}.json`);
  }
}

export default new TasksService();
