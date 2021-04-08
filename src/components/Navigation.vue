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
    <v-list
      dense
      nav
    >
      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-play-circle-outline</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title @click="$emit('new-game')">
            New Game
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-help-circle-outline</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title @click="$emit('show-solution')">
            Show Solution
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-information-outline</v-icon>
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