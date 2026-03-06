import api from '../firebase';

class TasksService {
  async getTasks() {
    const response = await api.get('/tasks.json');
    return response.data;
  }

  async addTask(task) {
    const response = await api.post('/tasks.json', task);
    return response.data;
  }

  async updateTask(id, task) {
    const response = await api.patch(`/tasks/${id}.json`, task);
    return response.data;
  }

  async deleteTask(id) {
    await api.delete(`/tasks/${id}.json`);
  }
}

export default new TasksService();
