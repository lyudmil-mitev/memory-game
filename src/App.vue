<template>
  <v-app>
    <v-app-bar app>
      <v-app-bar-nav-icon @click="toggleDrawer" />
      <v-toolbar-title>Memory Game</v-toolbar-title>
      <v-spacer />
      <v-btn
        icon
        @click="toggleHistory"
      >
        <v-icon>mdi-history</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      fixed
      temporary
    >
      <navigation
        @new-game="resetGame"
        @show-solution="resetAnswer(true)"
        @show-help="showHelp"
      />
    </v-navigation-drawer>

    <v-navigation-drawer
      v-model="showHistory"
      fixed
      temporary
      right
    >
      <history :history="answerLog" />
    </v-navigation-drawer>

    <v-main>
      <v-container
        fluid
        v-if="!difficulty"
      >
        <difficulty-chooser @set-difficulty="setGameDifficulty" />
      </v-container>

      <v-dialog
        v-model="dialog"
        width="600"
      >
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
              @click="dialog = false"
            >
              OK
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog
        v-model="gameWin"
        width="600"
      >
        <v-card
          class="text-center align-center"
          style="overflow: hidden"
          dark
        >
          <victory-message>
            <h1>You win!</h1>
          </victory-message>
          <v-card-actions class="justify-center">
            <v-btn
              x-large
              color="primary"
              @click="resetGame"
            >
              Play again
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-container
        class="grey"
        fluid
        v-if="difficulty > 0"
      >
        <v-row>
          <v-col
            cols="12"
            class="text-center"
          >
            <div :class="[`game game-size-${cards.length}`]">
              <game-card 
                v-for="card in cards"
                :key="card.value"
                :revealed="card.revealed"
                @flip="cardFlip"
                :number="card.value"
              />
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            class="text-center"
          >
            <v-btn
              v-if="isGameInProgress && !answerLog.length"
              @click="resetAnswer(false)"
              x-large
              color="primary"
            >
              Play
            </v-btn>
            <v-btn
              v-if="gameOver && !isAnswerCorrect"
              @click="resetAnswer(false)"
              x-large
              color="primary"
            >
              Try Again
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style lang="scss">
  .game {
    display: inline-grid;
    grid-gap: 5px;
    width: 80vw;
  }

  .game-size-12 {
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: 25vh;
    line-height: 25vh;
  }

  .game-size-8 {
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: 40vh;
    line-height: 40vh;
  }

  .game-size-4 {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 40vh;
    line-height: 40vh;
  }
</style>

<script lang="ts">
import Vue from 'vue';
import Component from "vue-class-component";
import GameCard from './components/GameCard.vue';
import Navigation from './components/Navigation.vue';
import DifficultyChooser from './components/DifficultyChooser.vue';
import VictoryMessage from './components/VictoryMessage.vue';
import History from './components/History.vue';
import * as RandomOrg from 'random-org';
import {Card, Answer} from './models/Card';

@Component({
  name: 'MemoryGame',
  components: {
    GameCard,
    Navigation,
    DifficultyChooser,
    VictoryMessage,
    History
  },
})
export default class App extends Vue {
  drawer = false;
  dialog = false;
  loading = false;
  showHistory = false;
  difficulty = 0;
  cards: Card[] = [];
  answerLog: Answer[] = [];
  minNumber = 1;
  maxNumber = 50;
  randomOrgAPI = new RandomOrg({ apiKey: process.env.VUE_APP_RANDOM_ORG_API_KEY });

  get gameOver():boolean {
    return this.cards.length === this.answerLog.length;
  }

  get gameWin():boolean {
    return this.gameOver && this.isAnswerCorrect;
  }

  get isAnswerCorrect():boolean {
    // Check if AnswerLog is sorted with Array.prototype.every
    return this.answerLog.length > 0 && 
           this.answerLog.every((answer,i) => !i || this.answerLog[i-1].card.value <= answer.card.value);
  }

  get isGameInProgress():boolean {
    return typeof this.cards.find(card => card.revealed) !== "undefined";
  }

  setGameDifficulty(value:number):void {
    this.difficulty = value;
    this.setGame();
  }

  toggleDrawer():void {
    this.drawer = !this.drawer;
  }

  toggleHistory():void {
    this.showHistory = true;
  }

  setGame():void {
    const config = {
      min: this.minNumber,
      max: this.maxNumber,
      n: this.difficulty, 
      replacement: false
    }

    this.cards = [...Array(this.difficulty).keys()].map(
      () => Object({value: null, revealed: true}) as Card
    );
    this.randomOrgAPI.generateIntegers(config).then((result:any) => {
      result.random.data.forEach((number:number, i:number) => {
        this.cards[i].value = number;
      })
    });
  }

  resetGame():void {
    this.difficulty = 0;
    this.cards = [];
    this.answerLog = [];
  }

  resetAnswer(revealed:boolean):void {
    if (this.difficulty) {
      this.answerLog = [];
      this.flipAllCards(revealed);
    }
  }

  cardFlip(number:number):void {
    const card = this.cards.find(card => card.value === number);
    if (card && !card.revealed) {
      card.revealed = true;
      this.answerLog.push({date: new Date(Date.now()), card: card});
    }
  }

  flipAllCards(revealed: boolean):void {
    this.cards = this.cards.map(card => {
      return {value: card.value, revealed };
    })
  }

  showHelp():void {
    this.dialog = true;
  }
}
</script>
