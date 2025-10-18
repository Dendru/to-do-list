<template>
  <v-container>
    <v-row justify="space-around">
      <v-date-picker
        show-adjacent-months
        v-model="date"
        :allowed-dates="allowedDates"
        :max="formattedFutureDate"
        :min="formattedDate"
        @update:modelValue="handleDateSelect"
        :first-day-of-week="1"
      ></v-date-picker>
    </v-row>
  </v-container>
</template>

<script setup>
import { useDate } from "vuetify";
import { ref } from "vue";

const emit = defineEmits(["date-selected"]);

const date = ref(new Date());
const adapter = useDate();
const formattedDate = ref(adapter.toISO(date.value));
const futureDate = new Date(date.value);
futureDate.setMonth(futureDate.getMonth() + 6);
const formattedFutureDate = ref(adapter.toISO(futureDate));

function handleDateSelect(date) {
  emit("date-selected", date);
}
</script>

<style>
body {
  font-family: "Nunito", sans-serif;
}
</style>
