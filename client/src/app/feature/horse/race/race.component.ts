import { Component, OnInit } from '@angular/core';
import { Horse } from 'src/app/core/models/horse';
import { AuthService } from 'src/app/core/services/auth.service';
import { HorseService } from 'src/app/core/services/horse.service';

@Component({
  selector: 'app-race',
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.scss'],
})
export class RaceComponent implements OnInit {
  trackLength: number = 800;
  raceIntervalMs: number = 40;
  moveConstant: number = 1;
  randomInfluence: number = 5;
  levelInfluence: number = 0.035;

  playerHorses: Horse[] = [];
  selectedHorse: Horse | undefined = undefined;
  playerPts: number = 0;
  botPts: number = 0;

  gameStatus: number = 0;
  isGameOver: boolean = false;
  isWinner: boolean = false;

  constructor(
    private authService: AuthService,
    private horseService: HorseService
  ) {}

  ngOnInit(): void {
    console.log(this.selectedHorse);
    this.horseService
      .getUserHorses(this.authService.currentUser.uid)
      .subscribe((horses) => {
        this.playerHorses = horses;
      });
  }

  startRace() {
    if (this.gameStatus == 1 || this.gameStatus == 2) {
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
        this.gameStatus = 2;
        clearInterval(raceInterval);
      }
    }, this.raceIntervalMs);
  }

  restartRace() {
    if (!this.isGameOver) {
      return;
    }
    this.isGameOver = false;
    this.gameStatus = 0;
    this.botPts = 0;
    this.playerPts = 0;
  }

  selectHorse(horse: Horse): void {
    this.selectedHorse = horse;
  }

  moveHorses() {
    const randomFactorPlayer = this.randomInfluence * Math.round(Math.random());
    const randomFactorBot = this.randomInfluence * Math.round(Math.random());

    this.playerPts += randomFactorPlayer + this.moveConstant;
    this.botPts += randomFactorBot + this.moveConstant;
  }
}
