<template>
  <v-date-picker
    v-model="model"
    :allowed-dates="allowedDates"
    :max="max"
    :min="min"
    :first-day-of-week="1"
    show-adjacent-months
  ></v-date-picker>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  modelValue: Date | null;
  allowedDates?: (val: unknown) => boolean;
  min?: string;
  max?: string;
}>();

const emit = defineEmits<{ (e: 'update:modelValue', value: Date | null): void }>();
const model = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
});

</script>
