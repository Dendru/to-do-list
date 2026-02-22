<template>
  <div class="pa-4 text-center">
    <v-dialog
      v-model="dialogStore.dialog"
      max-width="375"
      content-class="dialog"
    >
      <v-card>
        <v-card-text>
          <v-row dense>
            <v-col cols="12" md="12" sm="6">
              <v-text-field
                label="Введите задачу"
                required
                v-model="inputTask"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="12" sm="8">
              <v-text-field
                label="Введите описание"
                v-model="inputDescription"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="12" sm="8">
              <v-text-field
                label="Введитие дату"
                type="date"
                v-model="inputDate"
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            text="Закрыть"
            variant="plain"
            @click="dialogStore.close()"
          ></v-btn>

          <v-btn
            color="primary"
            text="Сохранить"
            variant="tonal"
            @click="createOrEditTask"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useDialogStore } from "../stores/dialog";
import { useTasksStore } from "../stores/tasks";


const dialogStore = useDialogStore();
const tasksStore = useTasksStore();

const inputTask = ref("");
const inputDescription = ref("");
const inputDate = ref("");

const createOrEditTask = () => {
  if (!inputTask.value || !inputDate.value) {
    alert("Заполните пустые поля");
    return;
  }
  const taskData = {
    id: tasksStore.editableTask?.id,
    title: inputTask.value,
    description: inputDescription.value,
    date: dateFormatting(inputDate.value),
    completed: false,
    checked: false,
  };

  if (tasksStore.editableTask) {
    tasksStore.updateTask(taskData);
  } else {
    tasksStore.addTask(taskData);
  }

  resetForm();
  tasksStore.stopEditing();
  dialogStore.close();
};

const dateFormatting = (inputDate) => {
  const date = new Date(inputDate);
  const formattedInputDate = date.toLocaleDateString("ru-RU");
  return formattedInputDate;
};

const resetForm = () => {
  inputTask.value = "";
  inputDescription.value = "";
  inputDate.value = "";
};
const watchChange = watch(
  () => tasksStore.editableTask,
  (task) => {
    if (task) {
      inputTask.value = task.title;
      inputDescription.value = task.description;
      const [day, month, year] = task.date.split(".");
      inputDate.value = `${year}-${month}-${day}`;
    } else {
      inputTask.value = "";
      inputDescription.value = "";
      inputDate.value = "";
    }
  },
  { immediate: true },
);
</script>

<style>
.dialog {
  top: 10% !important;
  transform: translateY(0) !important;
}
</style>
