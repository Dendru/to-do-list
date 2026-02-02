<template>
  <v-date-picker
    v-model="model"
    :allowed-dates="allowedDates"
    :max="max"
    :min="min"
    :first-day-of-week="1"
    show-adjacent-months
    @update:modelValue="$emit('update:modelValue', model)"
  ></v-date-picker>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  modelValue: Date,
  allowedDates: Function,
  min: String,
  max: String
});

const emit = defineEmits(["update:modelValue"]);
const model = ref(props.modelValue)

watch(() => props.modelValue, (val) => {
  model.value = val;
});

</script>
