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
        <div :class="{'current-task': !task.completed}"></div>
        <p class="task__name">{{ task.title }}</p>
        <p class="task__description" v-if="selectedTaskId === task.id">
          {{ task.description }}
        </p>
        <p class="task__date">{{ task.date }}</p>
        <div v-if="selectedTaskId === task.id" class="btn-group">
          <v-btn color="green" icon="mdi-check" :disabled="task.completed" @click="completeTask(task.id)"></v-btn>
          <v-btn icon="mdi-pencil" color="blue" :disabled="task.completed" @click="startEdit(task)"></v-btn>
          <v-btn color="red" icon="mdi-delete" @click="deleteTask(task.id)"></v-btn>
        </div>
      </li>
    </ul>
    <p v-else>В этот день нет задач</p>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useDialogStore } from "../stores/dialog";
import { useTasksStore } from "../stores/tasks";

const dialogStore = useDialogStore();
const tasksStore = useTasksStore();
const props = defineProps({
  selectedDay: Date,
});
const selectedTaskId = ref(null);

const selectedTask = (id) => {
  if (selectedTaskId.value === id) {
    selectedTaskId.value = null;
  } else {
    selectedTaskId.value = id;
  }
};

const filteredTasks = computed(() => {
  if (!props.selectedDay) return tasksStore.tasks;

  const selected = new Date(props.selectedDay).toDateString();

  return tasksStore.tasks.value.filter((task) => {
    const [day, month, year] = task.date.split(".");
    const taskDate = new Date(`${year}-${month}-${day}`);
    return taskDate.toDateString() === selected;
  });
});

const deleteTask = (id) => {
  tasksStore.deleteTask(id)
}

const startEdit = (task) => {
  tasksStore.startEditing(task)
  dialogStore.open()
}

const completeTask = (id) => {
  tasksStore.completeTask(id)
}
</script>

<style scoped></style>
