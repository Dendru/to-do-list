import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import TasksService from '../services/tasksService';

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref([]);
  const editableTask = ref(null);
  const showOnlyActualTasks = ref(false);

  const sortedTasks = computed(() => {
    return [...tasks.value].sort((firstTask, secondTask) => {
      if (firstTask.completed !== secondTask.completed) {
        return firstTask.completed ? 1 : -1;
      }

      return new Date(firstTask.date) - new Date(secondTask.date);
    });
  });

  const visibleTasks = computed(() => {
    const result = sortedTasks.value;

    if (showOnlyActualTasks.value) {
      return result.filter((task) => !task.completed);
    } else {
      return result;
    }
  });

  const addTask = async (task) => {
    try {
      await TasksService.addTask(task);
      await fetchTasks();
    } catch (error) {
      console.error('Ошибка при добавлении задачи:', error);
      throw error;
    }
  };
  const deleteTask = async (id) => {
    try {
      await TasksService.deleteTask(id);
      await fetchTasks();
    } catch (error) {
      console.error('Ошибка при удалении задачи:', error);
      throw error;
    }
  };

  const updateTask = async (updatedTask) => {
    try {
      await TasksService.updateTask(updatedTask.id, updatedTask);
      await fetchTasks();
    } catch (error) {
      console.error('Ошибка при редактировании задачи', error);
      throw error;
    }
  };

  function startEditing(task) {
    editableTask.value = { ...task };
  }

  function stopEditing() {
    editableTask.value = null;
  }

  const completeTask = async (id) => {
    try {
      const task = tasks.value.find((t) => t.id === id);
      if (!task) return;

      await TasksService.updateTask(id, { ...task, completed: true });
      await fetchTasks();
    } catch (error) {
      console.error('Ошибка при обновлении статуса задачи:', error);
      throw error;
    }
  };

  const fetchTasks = async () => {
    try {
      const data = await TasksService.getTasks();

      tasks.value = Object.entries(data ?? {}).map(([id, task]) => ({
        ...task,
        id,
      }));
    } catch (error) {
      console.error('Ошибка при загрузке задач:', error);
      tasks.value = [];
      throw error;
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
