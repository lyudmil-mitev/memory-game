<template>
  <v-app>
    <v-app-bar app>
      <v-app-bar-nav-icon @click="toggleDrawer" />
      <v-toolbar-title>Memory Game</v-toolbar-title>
      <v-spacer />
      <v-btn icon @click="toggleHistory">
        <v-icon>{{ historyIcon }}</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" fixed temporary>
      <navigation
        @new-game="
          resetGame();
          toggleDrawer();
        "
        @show-solution="
          resetAnswer(true);
          toggleDrawer();
        "
        @show-help="
          helpDialog = true;
          toggleDrawer();
        "
      />
    </v-navigation-drawer>

    <v-navigation-drawer v-model="showHistory" fixed temporary right>
      <history :history="answerLog" />
    </v-navigation-drawer>

    <v-main>
      <v-container fluid v-if="!difficulty">
        <difficulty-chooser @set-difficulty="setGameDifficulty" />
      </v-container>

      <v-dialog v-model="helpDialog" max-width="600">
        <help-card @close="helpDialog = false" />
      </v-dialog>

      <v-dialog v-model="gameWin" width="600">
        <v-card class="text-center align-center" style="overflow: hidden" dark>
          <victory-message>
            <h1>You win!</h1>
          </victory-message>
          <v-card-actions class="justify-center">
            <v-btn x-large color="primary" @click="resetGame">
              Play again
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-container grey fill-height fluid align-center v-if="difficulty > 0">
        <v-row justify="center" class="fill-height">
          <v-col cols="12" sm="8" md="6" lg="4" class="text-center">
            <div :class="[`game game-size-${cards.length}`]">
              <game-card
                v-for="(card, index) in cards"
                :key="index"
                :revealed="card.revealed"
                @flip="cardFlip"
                :number="card.value"
              />
            </div>
          </v-col>
        </v-row>
        <v-row justify="center">
          <bottom-navigation
            v-if="showPlayBtn || showTryAgainBtn"
            :show-play-btn="showPlayBtn"
            :show-try-again-btn="showTryAgainBtn"
            @play="resetAnswer(false)"
            @try-again="resetAnswer(false)"
          />
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style lang="scss">
html {
  overflow-y: auto
}

.game {
  display: inline-grid;
  grid-gap: 5px;
  width: 100%;
  height: 100%;
}

.game-size-12 {
  grid-template-columns: repeat(3, 1fr);
}

.game-size-8 {
  grid-template-columns: repeat(2, 1fr);
}

.game-size-4 {
  grid-template-columns: repeat(2, 1fr);
}
</style>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import GameCard from "./components/GameCard.vue";
import Navigation from "./components/Navigation.vue";
import DifficultyChooser from "./components/DifficultyChooser.vue";
import VictoryMessage from "./components/VictoryMessage.vue";
import History from "./components/History.vue";
import HelpCard from "./components/HelpCard.vue";
import BottomNavigation from "./components/BottomNavigation.vue";
import * as RandomOrg from "random-org";
import { Card, Answer } from "./models/Card";
import { mdiHistory } from "@mdi/js";
import { Watch } from "vue-property-decorator";

@Component({
  name: "MemoryGame",
  components: {
    GameCard,
    Navigation,
    DifficultyChooser,
    VictoryMessage,
    History,
    HelpCard,
    BottomNavigation,
  },
})
export default class App extends Vue {
  drawer = false;
  helpDialog = false;
  loading = false;
  showHistory = false;
  historyIcon = mdiHistory;
  difficulty = 0;
  cards: Card[] = [];
  answerLog: Answer[] = [];
  minNumber = 1;
  maxNumber = 50;
  randomOrgAPI = new RandomOrg({
    apiKey: process.env.VUE_APP_RANDOM_ORG_API_KEY,
  });

  get gameOver(): boolean {
    return this.cards.length === this.answerLog.length;
  }

  get gameWin(): boolean {
    return this.gameOver && this.isAnswerCorrect;
  }

  get isAnswerCorrect(): boolean {
    // Check if AnswerLog is sorted with Array.prototype.every
    return (
      this.answerLog.length > 0 &&
      this.answerLog.every(
        (answer, i) =>
          !i || this.answerLog[i - 1].card.value <= answer.card.value
      )
    );
  }

  get isGameInProgress(): boolean {
    return typeof this.cards.find((card) => card.revealed) !== "undefined";
  }

  get showPlayBtn(): boolean {
    return this.isGameInProgress && !this.answerLog.length;
  }

  get showTryAgainBtn(): boolean {
    return this.gameOver && !this.isAnswerCorrect;
  }

  @Watch('difficulty')
  onDifficultyChange(difficulty:number): void {
    if (difficulty > 0) {
      // Hide address bar and tab bar on mobile devices
      window.scrollTo(0, 1);
    } else {
      window.scrollTo(0, 0);
    }
  }

  setGameDifficulty(value: number): void {
    this.difficulty = value;
    this.setGame();
  }

  toggleDrawer(): void {
    this.drawer = !this.drawer;
  }

  toggleHistory(): void {
    this.showHistory = this.answerLog.length > 0;
  }

  setGame(): void {
    const config = {
      min: this.minNumber,
      max: this.maxNumber,
      n: this.difficulty,
      replacement: false,
    };

    this.cards = [...Array(this.difficulty).keys()].map(
      () => Object({ value: null, revealed: true }) as Card
    );
    this.randomOrgAPI.generateIntegers(config).then((result: any) => {
      result.random.data.forEach((number: number, i: number) => {
        this.cards[i].value = number;
      });
    });
  }

  resetGame(): void {
    this.difficulty = 0;
    this.cards = [];
    this.answerLog = [];
  }

  resetAnswer(revealed: boolean): void {
    if (this.difficulty) {
      this.answerLog = [];
      this.flipAllCards(revealed);
    }
  }

  cardFlip(number: number): void {
    const card = this.cards.find((card) => card.value === number);
    if (card && !card.revealed) {
      card.revealed = true;
      this.answerLog.push({ date: new Date(Date.now()), card: card });
    }
  }

  flipAllCards(revealed: boolean): void {
    this.cards = this.cards.map((card) => {
      return { value: card.value, revealed };
    });
  }

  showHelp(): void {
    this.helpDialog = true;
  }
}
</script>
