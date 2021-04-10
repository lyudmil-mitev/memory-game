<template>
  <v-bottom-navigation
    grow
    cols="12"
    width="auto"
    class="rounded"
  >
    <v-btn
      v-if="showPlayBtn"
      @click="$emit('play')"
      x-large
    >
      Play
      <v-icon color="primary">
        {{ playIcon }}
      </v-icon>
    </v-btn>
    <v-btn
      v-if="showTryAgainBtn"
      @click="$emit('try-again')"
      x-large
    >
      Try Again
      <v-icon color="primary">
        {{ tryAgainIcon }}
      </v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script lang="ts">
import { mdiPlay, mdiRestore } from "@mdi/js";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "BottomNavigation",
})
export default class BottomNavigation extends Vue {
  tryAgainIcon = mdiRestore;
  playIcon = mdiPlay;

  @Prop({ default: () => true }) showPlayBtn!: boolean;
  @Prop({ default: () => true }) showTryAgainBtn!: boolean;
}
</script>