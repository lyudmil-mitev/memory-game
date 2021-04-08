<template>
  <div
    v-on:click="$emit('flip', number)"
    v-bind:class="revealed ? 'flip-card flipped': 'flip-card'">
    <div class='flip-card-inner'>
      <div class='flip-card-front'></div>
      <div class='flip-card-back font-weight-black'>
          <h3 v-if="number">{{ number }}</h3>
          <v-progress-circular v-else indeterminate color="primary"></v-progress-circular>
      </div>
    </div>
  </div> 
</template>

<style lang="less">
  .flip-card {
    background-color: transparent;
    cursor: pointer;
    display: inline-grid;
    font-size: 200%;
    font-weight: bold;
    perspective: 1000px;
  }

  .flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.33s;
    transform-style: preserve-3d;
  }

  .flip-card.flipped .flip-card-inner {
    transform: rotateY(180deg);
  }

  .flip-card-front, .flip-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 5px;
    box-shadow: 1px 1px 5px #777;
  }

  .flip-card-front {
    .weave(#1B1C1A, #16606e, #218599, 15px);
    border: 5px solid white;
  }

  .flip-card-back {
    transform: rotateY(180deg);
    background: white;
  }

  .weave(@background, @right, @left, @size:25px) {
    background: linear-gradient(45deg, @right 12%, transparent 0, transparent 88%, @right 0), 
                linear-gradient(135deg, transparent 37%, @left 0, @left 63%, transparent 0), 
                linear-gradient(45deg, transparent 37%, @right 0, @right 63%, transparent 0), 
                @background;
    background-size: @size @size;
}
</style>
<script>
  export default {
    props: {
      number: {
        type: Number,
      },
      revealed: {
        type: Boolean
      }
    },
  }
</script>