<template>
  <div class="pyro-wrap">
    <div class="pyro">
      <div class="before" />
      <div class="after" />
    </div>
    <v-container
      fill-height
      fluid
    >
      <v-row
        align="center"
        justify="center"
      >
        <v-col>
          <slot />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<style lang="scss">
  @import '../scss/pyro.scss';
  .pyro-wrap {
      height: 40vh;
  }
</style>