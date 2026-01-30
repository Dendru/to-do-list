import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTasksStore = defineStore('tasks', () => {
    const tasks = ref([
        {
            id: 1,
            title: "Сделать работу по дому",
            description: "Пропылесосить квартиру",
            date: "19.01.2026",
            completed: false,
            checked: false,
        },
        {
            id: 2,
            title: "Написать пет проект для фронтенда",
            description: "Lorem",
            date: "20.01.2026",
            completed: false,
            checked: false,
        },
        {
            id: 3,
            title: "Написать второй пет проект для фронтенда",
            description:
                "Хочу сделать проект, который будет не стыдно представить на собеседовании и показать HR ",
            date: "21.01.2026",
            completed: false,
            checked: false,
        },
        {
            id: 4,
            title: "Какая то задача",
            description:
                "Хочу сделать проект, который будет не стыдно представить на собеседовании и показать HR ",
            date: "21.01.2026",
            completed: false,
            checked: false,
        },
        {
            id: 5,
            title: "Еще какая то задача",
            description:
                "Хочу сделать проект, который будет не стыдно представить на собеседовании и показать HR ",
            date: "21.01.2026",
            completed: false,
            checked: false,
        },
    ]);

    const editableTask = ref(null)

    function addTask(task) {
        tasks.value.push(task)
    };

    function deleteTask(id) {
        tasks.value = tasks.value.filter(task => task.id !== id)
    };

    function updateTask(updatedTask) {
        const index = tasks.value.findIndex(t => t.id === updatedTask.id)
        if (index !== -1) {
            tasks.value[index] = updatedTask
        }
    }

    function startEditing(task) {
        editableTask.value = task
    };

    function stopEditing() {
        editableTask.value = null
    }

    return {
        tasks,
        editableTask,
        addTask,
        deleteTask,
        updateTask,
        startEditing,
        stopEditing
    };
})