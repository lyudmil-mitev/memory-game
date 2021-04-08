<template>
    <div class="pyro-wrap">
        <div class="pyro">
            <div class="before"></div>
            <div class="after"></div>
        </div>
        <v-container fill-height fluid>
            <v-row align="center" justify="center">
                <v-col>
                    <slot></slot>
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