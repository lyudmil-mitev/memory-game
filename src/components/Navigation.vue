<template>
    <v-container>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Memory Game
          </v-list-item-title>
          <v-list-item-subtitle>
            Main Menu
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list dense nav>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-play-circle-outline</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title @click="newGame">New Game</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-help-circle-outline</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title @click="showSolution">Show Solution</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-information-outline</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title @click="showHelp">How to play</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-container>
</template>

<script lang="ts">
import { Vue, Component, Emit } from "vue-property-decorator";

@Component({
  name: 'Navigation',
})
export default class Navigation extends Vue {
    @Emit('new-game')
    newGame() {
        return true;
    }

    @Emit('show-help')
    showHelp() {
        return true;
    }

    @Emit('show-solution')
    showSolution() {
        return true;
    }
}
</script>
