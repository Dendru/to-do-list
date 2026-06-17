<template>
  <div class="tasks-block">
    <ul v-if="filteredTasks.length > 0">
      <li
        v-for="task in filteredTasks"
        :key="task.id"
        class="task"
        :class="{
          completed: task.completed,
          selected: selectedTaskId === task.id && !task.completed,
        }"
        @click="selectedTask(task.id)"
      >
        <div :class="{ 'current-task': !task.completed }"></div>
        <p class="task__name">{{ task.title }}</p>
        <p class="task__description" v-if="selectedTaskId === task.id">{{ task.description }}</p>
        <p class="task__date">{{ formatDate(task.date) }}</p>
        <div v-if="selectedTaskId === task.id" class="btn-group">
          <v-btn
            color="green"
            icon="mdi-check"
            :disabled="task.completed"
            @click="completeTask(task.id)"
          ></v-btn>
          <v-btn
            icon="mdi-pencil"
            color="blue"
            :disabled="task.completed"
            @click.stop="startEdit(task)"
          ></v-btn>
          <v-btn color="red" icon="mdi-delete" @click="deleteTask(task.id)"></v-btn>
        </div>
      </li>
    </ul>
    <p v-else>В этот день нет задач</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { format, parse } from 'date-fns';
import { useDialogStore } from '../stores/dialog';
import { useTasksStore } from '../stores/tasks';
import type { Task } from '../types/task';
import type { CalendarProps } from '../types/CalendarProps';

const dialogStore = useDialogStore();
const tasksStore = useTasksStore();
const calendarProps = defineProps<CalendarProps>();
const selectedTaskId = ref<string | null>(null);

const formatDate = (taskDate: string): string => {
  return format(parse(taskDate, 'yyyy-MM-dd', new Date()), 'dd.MM.yyyy');
};

onMounted(() => {
  tasksStore.fetchTasks();
});

const selectedTask = (id: string): void => {
  if (selectedTaskId.value === id) {
    selectedTaskId.value = null;
  } else {
    selectedTaskId.value = id;
  }
};

const filteredTasks = computed<Task[]>(() => {
  const tasks = tasksStore.visibleTasks || [];

  if (!calendarProps.selectedDay) return tasks;

  const formattedSelected = format(new Date(calendarProps.selectedDay), 'yyyy-MM-dd');

  return tasks.filter((task) => {
    const formattedTaskDate = format(new Date(task.date), 'yyyy-MM-dd');
    return formattedSelected === formattedTaskDate;
  });
});

const deleteTask = (id: string): void => {
  tasksStore.deleteTask(id);
};

const startEdit = (task: Task): void => {
  tasksStore.startEditing(task);
  dialogStore.open();
};

const completeTask = (id: string): void => {
  tasksStore.completeTask(id);
};
</script>
