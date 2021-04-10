<template>
  <v-item-group>
    <v-container>
      <v-row justify="center">
        <v-col
          cols="12"
          class="mt-6 mb=-2 text-center"
        >
          <h1 class="v-heading text-h6 text-sm-h4 mb-2">
            Choose the game difficulty
          </h1>
        </v-col>
        <v-col
          cols="12"
          sm="6"
          xl="4"
        >
          <v-col
            cols="12"
            min-width="200"
            max-width="600"
            v-for="d in buttons"
            :key="d.number"
          >
            <v-item>
              <v-card
                :color="d.color"
                class="align-center pa-2"
                dark
                height="100%"
                @click="$emit('set-difficulty', d.number)"
              >
                <v-card-text class="text-center">
                  <h1 class="mb-2 white--text">
                    {{ d.label }}
                  </h1>
                  <h3 class="white--text">
                    Play with {{ d.number }} cards
                  </h3>
                </v-card-text>
              </v-card>
            </v-item>
          </v-col>
        </v-col>
      </v-row>
    </v-container>
  </v-item-group>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
  name: "DifficultyChooser",
})
export default class DifficultyChooser extends Vue {
  buttons = [
    { number: 4, label: "Easy", color: "green darken-4" },
    { number: 8, label: "Medium", color: "yellow darken-4" },
    { number: 12, label: "Hard", color: "red darken-4" },
  ];
}
</script>