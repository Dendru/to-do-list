import api from "../firebase";

export const getTasksService = async () => {
  try {
    const response = await api.get("/tasks.json");
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении задач", error);
    return null;
  }
};

export const addTaskService = async (task) => {
  try {
    const response = await api.post("/tasks.json", task);
    return response.data;
  } catch (error) {
    console.error("Ошибка при добавлении задач", error);
    return null;
  }
};

export const updateTaskService = async (id, task) => {
  try {
    const response = await api.patch(`/tasks/${id}.json`, task);
    return response.data;
  } catch (error) {
    console.error("Ошибка при редактировании задач", error);
    return null;
  };
};

export const deleteTaskService = async (id) => {
  try {
    const response = await api.delete(`/tasks/${id}.json`);
    return response.data;
  } catch (error) {
    console.error("Ошибка при удалении задач", error);
    return null;
  }
};
