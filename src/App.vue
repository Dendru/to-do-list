<template>
  <v-app class="app">
    <header-bar @toggle-drawer="drawer = !drawer"></header-bar>
    <side-menu v-model="drawer"></side-menu>
    <v-main>
      <h2 class="title">Эта неделя</h2>
      <p class="month-and-year">{{ monthYear }}</p>
      <div class="week" @click="selectDayAndOpenCalendar">
        <div
          v-for="day in week"
          :key="day.fullDate.getTime()"
          :class="{ 'checked-day': isCheckedDay(day.fullDate) }"
        >
          <span class="day-name">{{ day.dayName }}</span>
          <span class="day-number">{{ day.dayNumber }}</span>
        </div>
      </div>
      <calendar-picker
        :open="calendarOpen"
        class="calendar"
        @date-selected="handleDateSelect"
      ></calendar-picker>
      <v-btn v-if="selectedDay" @click="selectedDay = null">Сбросить день</v-btn>
      <p v-if="!selectedDay">Все задачи</p>
      <tasks-page :selected-day="selectedDay" @open="store.open()"></tasks-page>
      <task-form></task-form>
      <button class="add-button" @click="store.open()">+</button>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useDialogStore } from './stores/dialog';
import CalendarPicker from './components/CalendarPicker.vue';
import TasksPage from './components/TasksPage.vue';
import TaskForm from './components/TaskForm.vue';
import HeaderBar from './components/HeaderBar.vue';
import SideMenu from './components/SideMenu.vue';

type WeekDay = {
  dayName: string
  dayNumber: number
  fullDate: Date
}

const calendarOpen = ref(false);
const drawer = ref(false);
const date = ref(new Date());
const week = ref<WeekDay[]>([]);
const store = useDialogStore();
const selectedDay = ref<Date | null>(null);

const currentMonth = ref(date.value.getMonth());
const currentYear = ref(date.value.getFullYear());

week.value = getCurrentWeek();

const months = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

const monthYear = computed(() => {
  return `${months[currentMonth.value]} ${currentYear.value}`;
});

function getCurrentWeek(baseDate: Date = new Date()): WeekDay[] {
  const dayOfWeek = baseDate.getDay();
  const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

  const arr: WeekDay[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(baseDate);
    d.setDate(baseDate.getDate() + mondayOffset + i);
    arr.push({
      dayName: d.toLocaleDateString('ru-RU', { weekday: 'short' }),
      dayNumber: d.getDate(),
      fullDate: d,
    });
  }
  return arr;
}

function isCheckedDay(day: Date): boolean {
  const checkedDay = selectedDay.value ?? new Date();
  return day.toDateString() === checkedDay.toDateString();
}

function selectDayAndOpenCalendar(): void {
  calendarOpen.value = !calendarOpen.value;
}

function handleDateSelect(selectedDate: Date | null): void {
  if (!selectedDate) return;
  
  selectedDay.value = selectedDate;
  currentMonth.value = selectedDate.getMonth();
  currentYear.value = selectedDate.getFullYear();
  week.value = getCurrentWeek(selectedDate);
  calendarOpen.value = false;
}
</script>
