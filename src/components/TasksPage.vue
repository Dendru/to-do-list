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
  {
    id: 6,
    title: "Что то надо сделать",
    description:
      "Хочу сделать проект, который будет не стыдно представить на собеседовании и показать HR ",
    date: "21.01.2026",
    completed: false,
    checked: false,
  },
  {
    id: 7,
    title: "Какая то важная хрень",
    description:
      "Хочу сделать проект, который будет не стыдно представить на собеседовании и показать HR ",
    date: "21.01.2026",
    completed: false,
    checked: false,
  },
  {
    id: 8,
    title: "Очень важное дело",
    description:
      "Хочу сделать проект, который будет не стыдно представить на собеседовании и показать HR ",
    date: "21.01.2026",
    completed: false,
    checked: false,
  },
  {
    id: 9,
    title: "Довольно серьезный бизнес",
    description:
      "Хочу сделать проект, который будет не стыдно представить на собеседовании и показать HR ",
    date: "21.01.2026",
    completed: false,
    checked: false,
  },
  {
    id: 10,
    title: "Что по делам?",
    description:
      "Хочу сделать проект, который будет не стыдно представить на собеседовании и показать HR ",
    date: "21.01.2026",
    completed: false,
    checked: false,
  },
  {
    id: 11,
    title: "Работу работаем",
    description:
      "Хочу сделать проект, который будет не стыдно представить на собеседовании и показать HR ",
    date: "21.01.2026",
    completed: false,
    checked: false,
  },
  {
    id: 12,
    title: "Вперед за пивом!",
    description:
      "Хочу сделать проект, который будет не стыдно представить на собеседовании и показать HR ",
    date: "21.01.2026",
    completed: false,
    checked: false,
  },
  {
    id: 13,
    title: "Ультра важное дело",
    description:
      "Хочу сделать проект, который будет не стыдно представить на собеседовании и показать HR ",
    date: "21.01.2026",
    completed: false,
    checked: false,
  },
  {
    id: 14,
    title: "Перевернуть котлету",
    description:
      "Хочу сделать проект, который будет не стыдно представить на собеседовании и показать HR ",
    date: "21.01.2026",
    completed: false,
    checked: false,
  },
  {
    id: 15,
    title: "Съесть котлету",
    description:
      "Хочу сделать проект, который будет не стыдно представить на собеседовании и показать HR ",
    date: "21.01.2026",
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
