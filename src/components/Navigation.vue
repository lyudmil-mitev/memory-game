<template>
  <v-container>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title"> Memory Game </v-list-item-title>
        <v-list-item-subtitle> Main Menu </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-list dense nav>
      <v-list-item-group>
        <v-list-item v-for="(item, index) in buttons" :key="index">
          <v-list-item-icon>
            <v-icon color="primary">
              {{ item.icon }}
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title @click.stop="$emit(item.event)">
              {{ item.label }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-container>
</template>
<script lang="ts">
import Vue from "vue";
import {
  mdiInformationOutline,
  mdiHelpCircleOutline,
  mdiPlayCircleOutline,
} from "@mdi/js";
import Component from "vue-class-component";

@Component({
  name: "Navigation",
})
export default class Navigation extends Vue {
  info = mdiInformationOutline;
  help = mdiHelpCircleOutline;
  play = mdiPlayCircleOutline;

  buttons = [
    { label: "New game", event: "new-game", icon: this.play },
    { label: "Show solution", event: "show-solution", icon: this.help },
    { label: "How to play", event: "show-help", icon: this.info },
  ];
}
</script>