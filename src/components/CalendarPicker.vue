<template>
  <v-container>
    <v-row justify="space-around">
      <v-date-picker
        v-model="date"
        :allowed-dates="allowedDates"
        :max="formattedFutureDate"
        :min="formattedDate"
      ></v-date-picker>
    </v-row>
  </v-container>
</template>

<script setup>
import { useDate } from "vuetify";
import { ref } from "vue";

const date = ref(new Date());
const adapter = useDate();
const formattedDate = ref(adapter.toISO(date.value));
const futureDate = new Date(date.value);

futureDate.setMonth(futureDate.getMonth() + 6);

const formattedFutureDate = ref(adapter.toISO(futureDate));
</script>
