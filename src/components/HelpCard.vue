<template>
  <v-card>
    <v-card-title class="headline grey lighten-2">
      How to play the memory game
    </v-card-title>

    <v-card-text>
      <p class="mt-4 mb-2">
        Challenge your mind with this simple memory game!
        <ol class="mt-2">
          <li>When you start the game cards with numbers will be shown to you</li>
          <li>Memorize the cards as best you can</li>
          <li>Click "Play" to flip the cards and hide the numbers</li>
          <li>Flip the cards back in the order of the numbers (from smallest to largest) to win!</li>
        </ol>
      </p>
    </v-card-text>
    <v-divider />
    <v-card-actions>
      <v-spacer />
      <v-btn
        color="primary"
        text
        @click.stop="$emit('close')"
      >
        OK
      </v-btn>
    </v-card-actions>
  </v-card>
</template>