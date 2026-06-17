<template>
  <v-app-bar app dense :elevation="2">
    <template v-slot:append>
      <v-app-bar-nav-icon @click="emit('toggle-drawer')"></v-app-bar-nav-icon>
    </template>
    <v-app-bar-title>Todo list</v-app-bar-title>
  </v-app-bar>
</template>

<script setup lang="ts">
const emit = defineEmits<{ (e: 'toggle-drawer'): void }>();
</script>
