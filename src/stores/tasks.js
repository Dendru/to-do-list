import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useTasksStore = defineStore('tasks', () => {
    const tasks = ref([
        {
            id: 1,
            title: "Сделать работу по дому",
            description: "Пропылесосить квартиру",
            date: "19.02.2026",
            completed: false,
            checked: false,
        },
        {
            id: 2,
            title: "Написать пет проект для фронтенда",
            description: "Lorem",
            date: "20.02.2026",
            completed: false,
            checked: false,
        },
        {
            id: 3,
            title: "Написать второй пет проект для фронтенда",
            description:
                "Хочу сделать проект, который будет не стыдно представить на собеседовании и показать HR ",
            date: "21.02.2026",
            completed: false,
            checked: false,
        },
        {
            id: 4,
            title: "Какая то задача",
            description:
                "Хочу сделать проект, который будет не стыдно представить на собеседовании и показать HR ",
            date: "21.02.2026",
            completed: false,
            checked: false,
        },
        {
            id: 5,
            title: "Еще какая то задача",
            description:
                "Хочу сделать проект, который будет не стыдно представить на собеседовании и показать HR ",
            date: "22.02.2026",
            completed: false,
            checked: false,
        },
    ]);
    const editableTask = ref(null)
    const showOnlyActualTasks = ref(false)

    const sortedTasks = computed(() => {
        return [...tasks.value].sort((a, b) => {
            if (a.completed !== b.completed) {
                return a.completed ? 1 : -1
            }

            const [ad, am, ay] = a.date.split('.')
            const [bd, bm, by] = b.date.split('.')

            const dateA = new Date(`${ay}-${am}-${ad}`)
            const dateB = new Date(`${by}-${bm}-${bd}`)

            return dateA - dateB
        });
    });

    const visibleTasks = computed(() => {
        let result = sortedTasks.value

        if (showOnlyActualTasks.value) {
            result = result.filter(task => !task.completed)
        }
        return result
    })

    function addTask(task) {
        tasks.value.push(task)
    };

    function deleteTask(id) {
        tasks.value = tasks.value.filter(task => task.id !== id)
    };

    function updateTask(updatedTask) {
        const index = tasks.value.findIndex(t => t.id === updatedTask.id)
        if (index !== -1) {
            tasks.value.splice(index, 1, updatedTask)
        }
    }

    function startEditing(task) {
        editableTask.value = task
    };

    function stopEditing() {
        editableTask.value = null
    };

    function completeTask(id) {
        const task = tasks.value.find(t => t.id === id)
        
        if (!task) return
        
        task.completed = true
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
        completeTask
    };
})