<template>
  <v-navigation-drawer :model-value="modelValue" right temporary @update:model-value="emit('update:modelValue', $event)" >
    <!-- <v-list>
      <v-list-item>
        <v-list-item-title>Фильтры задач</v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-checkbox label="Только важные задачи" />
      </v-list-item>
      <v-list-item>
        <v-btn @click="applyFilters">Применить</v-btn>
      </v-list-item>
    </v-list> -->
  </v-navigation-drawer>
</template>

<script setup>
const props = defineProps({
    modelValue: Boolean
});
const emit = defineEmits(['update:modelValue'])
</script>

<style>
</style>