<template>
  <div class="tasks-block">
    <ul v-if="filteredTasks.length > 0">
      <li
        v-for="task in filteredTasks"
        :key="task.id"
        class="task"
        :class="{
          completed: task.completed,
          selected: selectedTaskId === task.id,
        }"
        @click="selectedTask(task.id)"
      >
        <p class="task__name">{{ task.title }}</p>
        <p class="task__description" v-if="selectedTaskId === task.id">
          {{ task.description }}
        </p>
        <p class="task__date">{{ task.date }}</p>
        <div v-if="selectedTaskId === task.id" class="btn-group">
          <v-btn color="green" icon="mdi-check"></v-btn>
          <v-btn icon="mdi-pencil" color="blue" @click="store.open()"></v-btn>
          <v-btn color="red" icon="mdi-delete"></v-btn>
        </div>
      </li>
    </ul>
    <p v-else>В этот день нет задач</p>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useDialogStore } from "../stores/dialog";

const store = useDialogStore();
const props = defineProps({
  selectedDay: Date,
});
const selectedTaskId = ref(null);

const tasks = ref([
  {
    id: 1,
    title: "Сделать работу по дому",
    description: "Пропылесосить квартиру",
    date: "31.10.2025",
    completed: false,
    checked: false,
  },
  {
    id: 2,
    title: "Написать пет проект для фронтенда",
    description: "Lorem",
    date: "10.10.2025",
    completed: false,
    checked: false,
  },
  {
    id: 3,
    title: "Написать второй пет проект для фронтенда",
    description:
      "Хочу сделать проект, который будет не стыдно представить на собеседовании и показать HR ",
    date: "10.10.2025",
    completed: false,
    checked: false,
  },
]);

const selectedTask = (id) => {
  if (selectedTaskId.value === id) {
    selectedTaskId.value = null;
  } else {
    selectedTaskId.value = id;
  }
};

const filteredTasks = computed(() => {
  if (!props.selectedDay) return tasks.value;

  const selected = new Date(props.selectedDay).toDateString();

  return tasks.value.filter((task) => {
    const [day, month, year] = task.date.split(".");
    const taskDate = new Date(`${year}-${month}-${day}`);
    return taskDate.toDateString() === selected;
  });
});
</script>

<style scoped></style>
