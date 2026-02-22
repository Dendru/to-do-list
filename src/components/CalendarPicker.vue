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

<script setup>
import { useDate } from "vuetify";
import { ref, watch } from "vue";
import CalendarCore from "./CalendarCore.vue";

const props = defineProps({
  open: Boolean,
});

const menu = ref(false);
const emit = defineEmits(["date-selected"]);

const date = ref(new Date());
const adapter = useDate();

const formattedDate = ref(adapter.toISO(date.value));
const futureDate = new Date(date.value);
futureDate.setMonth(futureDate.getMonth() + 6);
const formattedFutureDate = ref(adapter.toISO(futureDate));

watch(
  () => props.open,
  (val) => {
    menu.value = val;
  },
);

function allowedDates(val) {
  const candidate = new Date(val);
  const candDay = candidate.toDateString();
  const minDay = new Date(formattedDate.value).toDateString();
  return new Date(candDay).getTime() >= new Date(minDay).getTime();
}

function handleDateSelect(val) {
  const selected = typeof val === "string" ? new Date(val) : val;
  emit("date-selected", selected);
  menu.value = false;
}
</script>

<style scoped>
body {
  font-family: "Nunito", sans-serif;
}
</style>
