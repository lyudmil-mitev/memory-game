<template>
  <v-container>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">
          History
        </v-list-item-title>
        <v-list-item-subtitle>Moves in chronolgical order</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-list
      dense
      nav
    >
      <v-list-item
        link
        v-for="action in history"
        :key="action.date.getTime()"
      >
        <v-list-item-subtitle>
          {{ action.date | dateFormat }}
        </v-list-item-subtitle>
        <v-list-item-title> Card {{ action.card.value }} </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Answer } from "../models/Card";

function dateFormat(date: Date): string {
  const hours = String(date.getHours()).padStart(2, "0");
  const mins = String(date.getMinutes()).padStart(2, "0");
  const secs = String(date.getSeconds()).padStart(2, "0");
  return `${hours}:${mins}:${secs}`;
}

@Component({
  name: "History",
  filters: {
    dateFormat: dateFormat
  }
})
export default class History extends Vue {
  @Prop({ default: () => [] }) history!: Answer[];
}
</script>