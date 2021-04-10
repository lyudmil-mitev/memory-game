<template>
  <v-item-group>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" class="mt-6 mb=-2 text-center">
          <h1 class="v-heading text-h6 text-sm-h4 mb-2">
            Choose the game difficulty
          </h1>
        </v-col>
        <v-col cols="12" sm="6" xl="4">
          <v-col cols="12" min-width="200" max-width="600">
            <v-item-group>
              <v-item>
                <v-card
                  height="100%"
                  @click="showHelp = !showHelp"
                >
                  <v-card-text class="grey lighten-2 text-center">
                    <h1 class="mb-2 black--text">How to play</h1>
                    <h3>Learn more</h3>
                  </v-card-text>
                  <v-expand-transition>
                    <div v-show="showHelp">
                      <v-divider />
                      <v-card-text white>
                        <ol class="mt-2">
                          <li>
                            When you start the game cards with numbers will be
                            shown to you
                          </li>
                          <li>Memorize the cards as best you can</li>
                          <li>
                            Click "Play" to flip the cards and hide the numbers
                          </li>
                          <li>
                            Flip the cards back in the order of the numbers
                            (from smallest to largest) to win!
                          </li>
                        </ol>
                      </v-card-text>
                    </div>
                  </v-expand-transition>
                </v-card>
              </v-item>
              <v-item v-for="d in buttons" :key="d.number">
                <v-card
                  :color="d.color"
                  class="align-center pa-2 mt-2"
                  dark
                  height="100%"
                  @click="$emit('set-difficulty', d.number)"
                >
                  <v-card-text class="text-center">
                    <h1 class="mb-2 white--text">
                      {{ d.label }}
                    </h1>
                    <h3 class="white--text">Play with {{ d.number }} cards</h3>
                  </v-card-text>
                </v-card>
              </v-item>
            </v-item-group>
          </v-col>
        </v-col>
      </v-row>
    </v-container>
  </v-item-group>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import HelpCard from "./HelpCard.vue";

@Component({
  components: { HelpCard },
  name: "DifficultyChooser",
})
export default class DifficultyChooser extends Vue {
  showHelp = false;
  buttons = [
    { number: 4, label: "Easy", color: "green darken-4" },
    { number: 8, label: "Medium", color: "yellow darken-4" },
    { number: 12, label: "Hard", color: "red darken-4" },
  ];
}
</script>