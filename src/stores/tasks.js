import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import {
  getTasksService,
  addTaskService,
  updateTaskService,
  deleteTaskService,
} from '../services/tasksService';

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref([]);
  const editableTask = ref(null);
  const showOnlyActualTasks = ref(false);

  const sortedTasks = computed(() => {
    return [...tasks.value].sort((firstTask, secondTask) => {
      if (firstTask.completed !== secondTask.completed) {
        return firstTask.completed ? 1 : -1;
      }
        
      return new Date(firstTask.date) - new Date(secondTask.date)
    });
  });

  const visibleTasks = computed(() => {
    let result = sortedTasks.value;

    if (showOnlyActualTasks.value) {
      result = result.filter((task) => !task.completed);
    }
    return result;
  });

  const addTask = async (task) => {
    try {
      const newTask = await addTaskService(task);

      if (newTask) {
        task.id = newTask.name;
        tasks.value.push(task);
      }
    } catch (error) {
      console.error('Ошибка при добавлении задачи:', error);
    }
  };
  const deleteTask = async (id) => {
    try {
      const result = await deleteTaskService(id);
      tasks.value = tasks.value.filter((task) => task.id !== id);
    } catch (error) {
      console.error('Ошибка при удалении задачи:', error);
    }
  };

  const updateTask = async (updatedTask) => {
    try {
      const result = await updateTaskService(updatedTask.id, updatedTask);
      if (result) {
        const index = tasks.value.findIndex((t) => t.id === updatedTask.id);
        if (index !== -1) {
          tasks.value.splice(index, 1, updatedTask);
        }
      }
    } catch (error) {
      console.error('Ошибка при редактировании задачи', error);
    }
  };

  function startEditing(task) {
    editableTask.value = task;
  }

  function stopEditing() {
    editableTask.value = null;
  }

  const completeTask = async (id) => {
    try {
      const task = tasks.value.find((t) => t.id === id);
      if (!task) return;

      const result = await updateTaskService(id, { ...task, completed: true });
      if (result) {
        task.completed = true;
      }
    } catch (error) {
      console.error('Ошибка при обновлении статуса задачи:', error);
    }
  };

  const fetchTasks = async () => {
    try {
      const data = await getTasksService();

      if (!data) {
        tasks.value = [];
        return;
      }

      tasks.value = Object.entries(data).map(([id, task]) => ({
        ...task,
        id,
      }));
    } catch (error) {
      console.error('Ошибка при загрузке задач:', error);
      tasks.value = [];
    }
  };

  return {
    tasks,
    editableTask,
    sortedTasks,
    showOnlyActualTasks,
    visibleTasks,
    addTask,
    deleteTask,
    updateTask,
    startEditing,
    stopEditing,
    completeTask,
    fetchTasks,
  };
});
