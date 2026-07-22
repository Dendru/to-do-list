<template>
  <div class="pa-4 text-center">
    <v-dialog v-model="dialogStore.dialog" max-width="375" content-class="dialog">
      <v-card>
        <v-card-text>
          <v-row dense>
            <v-col cols="12" md="12" sm="6">
              <v-text-field label="Введите задачу" required v-model="inputTask"></v-text-field>
            </v-col>
            <v-col cols="12" md="12" sm="8">
              <v-text-field label="Введите описание" v-model="inputDescription"></v-text-field>
            </v-col>
            <v-col cols="12" md="12" sm="8">
              <v-text-field
                label="Выберите дату"
                :model-value="formattedDate"
                :min="today"
                required
                append-inner-icon="mdi-calendar"
                @click:append-inner="openCalendar"
              >
              </v-text-field>
              <calendar-picker
                v-model:open="calendarOpen"
                @date-selected="handleDateSelected"
              ></calendar-picker>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="Закрыть" variant="plain" @click="closeForm"></v-btn>

          <v-btn color="primary" text="Сохранить" variant="tonal" @click="createOrEditTask"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { format, parse } from 'date-fns';
import CalendarPicker from './CalendarPicker.vue';
import { useDialogStore } from '../stores/dialog';
import { useTasksStore } from '../stores/tasks';
import type { Task, TaskResponse } from '../types/task';

const dialogStore = useDialogStore();
const tasksStore = useTasksStore();

const calendarOpen = ref(false);
const inputTask = ref('');
const inputDescription = ref('');
const inputDate = ref('');
const today = new Date().toLocaleDateString('en-CA');

const formattedDate = computed(() => {
  if (!inputDate.value) return '';

  return format(parse(inputDate.value, 'yyyy-MM-dd', new Date()), 'dd.MM.yyyy');
});

const openCalendar = () => {
  calendarOpen.value = !calendarOpen.value;
};

const createOrEditTask = async (): Promise<void> => {
  if (!inputTask.value || !inputDate.value) {
    alert('Заполните пустые поля');
    return;
  }

  if (tasksStore.editableTask) {
    const taskData: Task = {
      ...tasksStore.editableTask,
      title: inputTask.value,
      description: inputDescription.value,
      date: inputDate.value,
    };

    await tasksStore.updateTask(taskData);
  } else {
    const taskData: TaskResponse = {
      title: inputTask.value,
      description: inputDescription.value,
      date: inputDate.value,
      completed: false,
      checked: false,
    };

    await tasksStore.addTask(taskData);
  }

  resetForm();
  tasksStore.stopEditing();
  dialogStore.close();
};

const closeForm = (): void => {
  resetForm();
  tasksStore.stopEditing();
  dialogStore.close();
};

const resetForm = () => {
  inputTask.value = '';
  inputDescription.value = '';
  inputDate.value = '';
};
watch(
  () => tasksStore.editableTask,
  (task) => {
    if (task) {
      inputTask.value = task.title;
      inputDescription.value = task.description;
      inputDate.value = task.date;
    } else {
      inputTask.value = '';
      inputDescription.value = '';
      inputDate.value = '';
    }
  },
  { immediate: true }
);

const handleDateSelected = (selectedDate: Date | null): void => {
  if (!selectedDate) return;

  inputDate.value = selectedDate.toLocaleDateString('en-CA');
};
</script>

<style>
.dialog {
  top: 10% !important;
  transform: translateY(0) !important;
}
</style>
