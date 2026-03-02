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

<script setup>
import { ref, computed, onMounted } from 'vue';
import { format, parse } from 'date-fns';
import { useDialogStore } from '../stores/dialog';
import { useTasksStore } from '../stores/tasks';

const dialogStore = useDialogStore();
const tasksStore = useTasksStore();
const props = defineProps({
  selectedDay: Date,
});
const selectedTaskId = ref(null);

const formatDate = (taskDate) => {
  return format(parse(taskDate, 'yyyy-MM-dd', new Date()), 'dd.MM.yyyy');
};

onMounted(() => {
  tasksStore.fetchTasks();
});

const selectedTask = (id) => {
  if (selectedTaskId.value === id) {
    selectedTaskId.value = null;
  } else {
    selectedTaskId.value = id;
  }
};

const filteredTasks = computed(() => {
  const tasks = tasksStore.visibleTasks || [];

  if (!props.selectedDay) return tasks;

  const formattedSelected = format(new Date(props.selectedDay), 'yyyy-MM-dd');

  return tasks.filter((task) => {
    const formattedTaskDate = format(new Date(task.date), 'yyyy-MM-dd');
    return formattedSelected === formattedTaskDate;
  });
});

const deleteTask = (id) => {
  tasksStore.deleteTask(id);
};

const startEdit = (task) => {
  tasksStore.startEditing(task);
  dialogStore.open();
};

const completeTask = (id) => {
  tasksStore.completeTask(id);
};
</script>
