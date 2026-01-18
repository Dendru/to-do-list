<template>
  <div class="pa-4 text-center">
    <v-dialog v-model="store.dialog" max-width="375" content-class="dialog">
      <v-card>
        <v-card-text>
          <v-row dense>
            <v-col cols="12" md="12" sm="6">
              <v-text-field label="Введите задачу" required></v-text-field>
            </v-col>
            <v-col cols="12" md="12" sm="8">
              <v-text-field label="Введите описание"></v-text-field>
            </v-col>
            <v-col cols="12" md="12" sm="8">
              <v-text-field label="Введитие дату" type="date"></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>

        <!-- <template #activator="{ props }">
          <v-text-field v-bind="props" v-model="formattedDate" label="Выберите дату" readonly prepend-icon="mdi-calendar"></v-text-field>
        </template> -->

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="Закрыть" variant="plain" @click="store.close()"></v-btn>

          <v-btn
            color="primary"
            text="Сохранить"
            variant="tonal"
            @click="store.close()"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useDate } from "vuetify"
import { useDialogStore } from "../stores/dialog";

const store = useDialogStore();
const menu = ref(false)
const date = ref(null)
const formattedDate = ref("")
const adapter = useDate();



</script>

<style>
.dialog {
  top: 10% !important;
  transform: translateY(0) !important;
}
</style>
