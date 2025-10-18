<template>
  <div class="app">
    <h2 class="title">Эта неделя</h2>
    <p class="month-and-year">{{ monthYear }}</p>
    <div class="week" @click="selectDayAndOpenCalendar">
      <div
        v-for="day in week"
        :key="day.fullDate"
        :class="{ 'checked-day': isCheckedDay(day.fullDate) }"
      >
        <span class="day-name">{{ day.dayName }}</span>
        <span class="day-number">{{ day.dayNumber }}</span>
      </div>
    </div>
    <calendar-picker
      v-if="calendarOpen"
      class="calendar"
      @date-selected="handleDateSelect"
    ></calendar-picker>

    <p v-if="!selectedDay">Все задачи</p>
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
        </li>
      </ul>
      <p v-else>В этот день нет задач</p>
    </div>
    <button class="add-button">+</button>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import CalendarPicker from "./components/CalendarPicker.vue";

const calendarOpen = ref(false);
const date = ref(new Date());
const selectedDay = ref(null);
const week = ref([]);
const selectedTaskId = ref(null);
const currentMonth = ref(date.value.getMonth());
const currentYear = ref(date.value.getFullYear());

week.value = getCurrentWeek();

const months = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];
const tasks = ref([
  {
    id: 1,
    title: "Сделать работу по дому",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo laborum quo sequi blanditiis porro quas nam nobis hic, fugit minima, sed pariatur eaque, consectetur assumenda soluta vitae incidunt doloribus in. Beatae suscipit dolor ea vitae temporibus doloribus inventore autem cum nihil ducimus quas et, perferendis eveniet unde similique. Neque nisi recusandae et eligendi, doloribus repellendus maxime dolorem animi quas provident illum nobis vero! Cum provident adipisci maxime laborum rerum ad et libero necessitatibus quam error distinctio voluptatibus repellat, velit voluptatem expedita unde suscipit ut blanditiis sed officia vero. Illum?",
    date: "18.10.2025",
    completed: true,
  },
  {
    id: 2,
    title: "Сделать пет проект для фронтенда",
    description: "",
    date: "19.10.2025",
    completed: false,
  },
  {
    id: 3,
    title: "Написать второй пет проект для фронтенда",
    description:
      "Хочу сделать проект, который будет не стыдно представить на собеседовании и показать на HR",
    date: "20.10.2025",
    completed: false,
  },
]);

const monthYear = computed(() => {
  return `${months[currentMonth.value]} ${currentYear.value}`;
});

const selectedTask = (id) => {
  if (selectedTaskId.value === id) {
    selectedTaskId.value = null;
  } else {
    selectedTaskId.value = id;
  }
};

function getCurrentWeek(baseDate = new Date()) {
  const dayOfWeek = baseDate.getDay();
  const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

  const arr = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(baseDate);
    d.setDate(baseDate.getDate() + mondayOffset + i);
    arr.push({
      dayName: d.toLocaleDateString("ru-RU", { weekday: "short" }),
      dayNumber: d.getDate(),
      fullDate: d,
    });
  }
  return arr;
}

function isCheckedDay(day) {
  const checkedDay = selectedDay.value
    ? new Date(selectedDay.value)
    : new Date();
  return day.toDateString() === checkedDay.toDateString();
}

function selectDayAndOpenCalendar() {
  calendarOpen.value = !calendarOpen.value;
}

function handleDateSelect(selectedDate) {
  selectedDay.value = selectedDate;
  currentMonth.value = selectedDate.getMonth();
  currentYear.value = selectedDate.getFullYear();
  week.value = getCurrentWeek(selectedDate);
  calendarOpen.value = false;
}

const filteredTasks = computed(() => {
  if (!selectedDay.value) return tasks.value;

  const selected = new Date(selectedDay.value).toDateString();

  return tasks.value.filter((task) => {
    const [day, month, year] = task.date.split(".");
    const taskDate = new Date(`${year}-${month}-${day}`);
    return taskDate.toDateString() === selected;
  });
});
</script>

<style></style>
