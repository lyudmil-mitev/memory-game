<template>
  <div
    @click="$emit('flip', number)"
    :class="revealed ? 'flip-card flipped' : 'flip-card'"
  >
    <div class="flip-card-inner">
      <div class="flip-card-front" />
      <div class="flip-card-back font-weight-black">
        <span v-if="number">
          {{ number }}
        </span>
        <v-progress-circular v-else indeterminate color="primary" />
      </div>
    </div>
  </div>
</template>

<style lang="less">
.flip-card {
  background-color: transparent;
  cursor: pointer;
  display: grid;
  font-size: 200%;
  font-weight: bold;
  align-self: center;
  perspective: 1000px;
  height: 100%;
  box-shadow: 1px 1px 5px #777;
  border-radius: 5px;
  background: #777;
}

.flip-card-inner {
  transition: transform 0.33s;
  transform-style: preserve-3d;
}

.flip-card.flipped .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front,
.flip-card-back {
  position: absolute;
  backface-visibility: hidden;
  width: 100%;
  height: 100%;
  border-radius: 5px;
}

.flip-card-front {
  .weave(#1b1c1a, #16606e, #218599, 15px);
  border: 5px solid white;
}

.flip-card-back {
  transform: rotateY(180deg);
  background: white;
}

.flip-card-back > *,
.flip-card-back > .v-progress-circular {
  /* set stuff inside card to centered 1em */
  position: absolute;
  display: inline;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 2em;
  height: 1em;
  padding: 0;
  margin: auto;
  line-height: 1em;
}

.weave(@background, @right, @left, @size:25px) {
  background: linear-gradient(
      45deg,
      @right 12%,
      transparent 0,
      transparent 88%,
      @right 0
    ),
    linear-gradient(135deg, transparent 37%, @left 0, @left 63%, transparent 0),
    linear-gradient(45deg, transparent 37%, @right 0, @right 63%, transparent 0),
    @background;
  background-size: @size @size;
}
</style>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "GameCard",
})
export default class GameCard extends Vue {
  @Prop({ default: () => null }) number!: number;
  @Prop({ default: () => true }) revealed!: boolean;
}
</script>