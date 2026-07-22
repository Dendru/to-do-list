<template>
  <v-menu v-model="menu" scrim :close-on-content-click="false">
    <template #activator="{ props }">
      <span v-bind="props"></span>
    </template>

    <v-card @click.stop>
      <calendar-core
        v-model="date"
        :allowed-dates="allowedDates"
        :max="formattedFutureDate"
        :min="formattedDate"
        @update:modelValue="handleDateSelect"
      ></calendar-core>

      <v-card-actions>
        <v-btn text color="grey" @click="menu = false">Закрыть</v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script setup lang="ts">
import { useDate } from 'vuetify';
import { ref, computed } from 'vue';
import CalendarCore from './CalendarCore.vue';

const props = defineProps<{
  open: boolean;
}>();

const emit = defineEmits<{
  (e: 'date-selected', value: Date | null): void;
  (e: 'update:open', value: boolean): void;
}>();

const date = ref(new Date());
const adapter = useDate();

const formattedDate = ref(adapter.toISO(date.value));
const futureDate = new Date(date.value);
futureDate.setMonth(futureDate.getMonth() + 6);
const formattedFutureDate = ref(adapter.toISO(futureDate));

const menu = computed({
  get: () => props.open,
  set: (val) => emit('update:open', val),
});

function allowedDates(val: unknown): boolean {
  const candidate = new Date(val as string);
  const candDay = candidate.toDateString();
  const minDay = new Date(formattedDate.value).toDateString();
  return new Date(candDay).getTime() >= new Date(minDay).getTime();
}

function handleDateSelect(val: Date | null) {
  emit('date-selected', val);
  menu.value = false;
}
</script>

<style scoped>
body {
  font-family: 'Nunito', sans-serif;
}
</style>
