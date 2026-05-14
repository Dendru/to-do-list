<template>
  <v-navigation-drawer
    :model-value="modelValue"
    right
    temporary
    @update:model-value="emit('update:modelValue', $event)"
  >
    <v-list>
      <v-list-item>
        <v-list-item-title>Фильтры задач</v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-switch
          v-model="tasksStore.showOnlyActualTasks"
          color="blue"
          label="Только актуальные"
        ></v-switch>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useTasksStore } from '../stores/tasks';

const tasksStore = useTasksStore();
const props = defineProps<{
  modelValue: boolean | null;
}>();
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();
</script>
