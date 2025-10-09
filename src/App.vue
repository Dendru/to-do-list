<template>
  <div class="app">
    <h2 class="title">Эта неделя</h2>
    <p class="month-and-year">{{ monthYear }}</p>
    <div class="week">
      <button
        v-for="day in week"
        :key="day.fullDate"
        :class="{today: isToday(day.fullDate)}"
        @click="selectDay(day.fullDate)"
      >
        <span class="day-name">{{ day.dayName }}</span>
        <span class="day-number">{{ day.dayNumber }}</span>
      </button>
    </div>
    <!-- <div class="day-of-week">
      <p class="name-of-day">Пятница</p>
      <p class="day">10</p>
    </div> -->
    <div class="tasks-block">
      <ul>
        <li
          v-for="task in tasks"
          :key="task.id"
          class="task"
          :class="{
            completed: task.completed, 
            selected: selectedTaskId === task.id }"
          @click="selectedTask(task.id)"
        >
          <p class="task__name">{{ task.title }}</p>
          <p class="task__description" v-if="selectedTaskId === task.id">{{ task.description }}</p>
          <p class="task__date">{{ task.date }}</p>
        </li>
      </ul>
    </div>
    <button class="add-button">+</button>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const date = ref(new Date())
const months = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь']
const monthYear = computed(() => {
  return `${months[date.value.getMonth()]} ${date.value.getFullYear()}`
})
const selectedDay = ref(null);
const week = ref([]);
const selectedTaskId = ref(null);
const tasks = ref([
  {
    id: 1,
    title: "Сделать работу по дому",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo laborum quo sequi blanditiis porro quas nam nobis hic, fugit minima, sed pariatur eaque, consectetur assumenda soluta vitae incidunt doloribus in. Beatae suscipit dolor ea vitae temporibus doloribus inventore autem cum nihil ducimus quas et, perferendis eveniet unde similique. Neque nisi recusandae et eligendi, doloribus repellendus maxime dolorem animi quas provident illum nobis vero! Cum provident adipisci maxime laborum rerum ad et libero necessitatibus quam error distinctio voluptatibus repellat, velit voluptatem expedita unde suscipit ut blanditiis sed officia vero. Illum?",
    date: "10.10.2025",
    completed: true,
  },
  {
    id: 2,
    title: "Сделать пет проект для фронтенда",
    description: "",
    date: "10.10.2025",
    completed: false,
  },
  {
    id: 3,
    title: "Написать второй пет проект для фронтенда",
    description:
      "Хочу сделать проект, который будет не стыдно представить на собеседовании и показать на HR",
    date: "10.10.2025",
    completed: false,
  },
]);
const selectedTask = (id) => {
  if (selectedTaskId.value === id) {
    selectedTaskId.value = null;
  } else {
    selectedTaskId.value = id;
  }
};

function getCurrentWeek() {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

  const arr = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + mondayOffset + i);
    arr.push({
      dayName: d.toLocaleDateString("ru-RU", { weekday: "short" }),
      dayNumber: d.getDate(),
      fullDate: d,
    });
  }
  return arr;
}

week.value = getCurrentWeek();

function isToday(date) {
  const today = new Date();
  return date.toDateString() === today.toDateString();
}

function selectDay(date) {
  selectedDay.value = date;
}

</script>

<style>
</style>
