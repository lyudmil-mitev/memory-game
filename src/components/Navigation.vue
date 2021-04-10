<template>
  <v-container>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">
          Memory Game
        </v-list-item-title>
        <v-list-item-subtitle> Main Menu </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-list
      dense
      nav
    >
      <v-list-item link>
        <v-list-item-icon>
          <v-icon color="primary">
            {{ play }}
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title @click="$emit('new-game')">
            New Game
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link>
        <v-list-item-icon>
          <v-icon color="primary">
            {{ info }}
          </v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title @click="$emit('show-solution')">
            Show Solution
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link>
        <v-list-item-icon>
          <v-icon color="primary">
            {{ help }}
          </v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title @click="$emit('show-help')">
            How to play
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
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
}
</script>