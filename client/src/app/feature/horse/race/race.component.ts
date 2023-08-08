import { Component } from '@angular/core';

@Component({
  selector: 'app-race',
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.scss'],
})
export class RaceComponent {
  trackLength: number = 800;
  raceIntervalMs: number = 40;
  moveConstant: number = 1;
  randomInfluence: number = 5;
  levelInfluence: number = 0.035;

  playerPts: number = 0;
  botPts: number = 0;

  gameStatus: number = 0;
  isGameOver: boolean = false;
  isWinner: boolean = false;

  constructor() {}

  startRace() {
    if (this.gameStatus == 1) {
      return;
    }

    this.gameStatus = 1;
    let raceInterval = setInterval(() => {
      this.moveHorses();

      if (
        this.playerPts >= this.trackLength ||
        this.botPts >= this.trackLength
      ) {
        this.isWinner = this.playerPts > this.botPts ? true : false;
        this.isGameOver = true;
        clearInterval(raceInterval);
      }
    }, this.raceIntervalMs);
  }

  restartRace() {
    if (!this.isGameOver) {
      return;
    }
    this.gameStatus = 0;
    this.botPts = 0;
    this.playerPts = 0;
  }

  moveHorses() {
    const randomFactorPlayer = this.randomInfluence * Math.round(Math.random());
    const randomFactorBot = this.randomInfluence * Math.round(Math.random());

    this.playerPts += randomFactorPlayer + this.moveConstant;
    this.botPts += randomFactorBot + this.moveConstant;
  }
}
