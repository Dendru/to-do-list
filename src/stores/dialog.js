import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useDialogStore = defineStore('dialog', () => {
  const dialog = ref(false);

  const open = () => (dialog.value = true);
  const close = () => (dialog.value = false);
  return { dialog, open, close };
});
