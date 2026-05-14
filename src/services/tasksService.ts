import api from '../firebase';
import type { TaskResponse } from '../types/task'

class TasksService {
  async getTasks(): Promise<Record<string, TaskResponse>> {
    const response = await api.get<Record<string, TaskResponse>>('/tasks.json');
    return response.data;
  }

  async addTask(task: TaskResponse): Promise<{ name: string }> {
    const response = await api.post<{ name: string}>('/tasks.json', task);
    return response.data;
  }

  async updateTask(id: string, task: Partial<TaskResponse>): Promise<void> {
    await api.patch(`/tasks/${id}.json`, task);
  }

  async deleteTask(id: string): Promise<void> {
    await api.delete(`/tasks/${id}.json`);
  }
}

export default new TasksService();
