import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Horse } from 'src/app/core/models/horse';
import { AuthService } from 'src/app/core/services/auth.service';
import { HorseService } from 'src/app/core/services/horse.service';
import { AlertComponent } from 'src/app/shared/dialog/alert/alert.component';

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
  levelInfluence: number = 0.05;

  playerHorses: Horse[] = [];
  selectedHorse: Horse | any;

  playerPts: number = 0;
  botPts: number = 0;

  gameStatus: number = 0;
  isGameOver: boolean = false;
  winner: string = '';

  constructor(
    private authService: AuthService,
    private horseService: HorseService,
    private dialog: MatDialog
  ) {}

  // Get all horses for the currently logged user
  ngOnInit(): void {
    this.horseService
      .getUserHorses(this.authService.currentUser.uid)
      .subscribe({
        next: (horses) => {
          this.playerHorses = horses;
        },
        error: (err) => {
          this.dialog.open(AlertComponent, {
            data: {
              title: 'ERROR',
              message: err.message,
              color: 'red',
            },
          });
        },
      });
  }

  selectHorse(horse: Horse): void {
    this.selectedHorse = horse;
  }

  startRace() {
    if (this.gameStatus == 1 || this.gameStatus == 2) {
      return;
    }

    // status 1 => game is running
    this.gameStatus = 1;
    let raceInterval = setInterval(() => {
      this.moveHorses();

      if (
        this.playerPts >= this.trackLength ||
        this.botPts >= this.trackLength
      ) {
        // status 2 => game is over
        this.gameStatus = 2;
        this.isGameOver = true;
        this.winner = this.playerPts > this.botPts ? 'player' : 'bot';
        clearInterval(raceInterval);
        this.announceWinner();
      }
    }, this.raceIntervalMs);
  }

  moveHorses() {
    const randomFactorPlayer = this.randomInfluence * Math.round(Math.random());
    const randomFactorBot = this.randomInfluence * Math.round(Math.random());

    const levelFactorPlayer = this.levelInfluence * this.selectedHorse.level;
    const botFactorPlayer =
      this.levelInfluence * (this.selectedHorse.level + 1);

    // player move points => move constant + random factor + level factor
    this.playerPts +=
      this.moveConstant + randomFactorPlayer + levelFactorPlayer;

    // bot move points => move constant + random factor + (user level: +1)
    this.botPts += this.moveConstant + randomFactorBot + botFactorPlayer;
  }

  restartRace() {
    if (!this.isGameOver) {
      return;
    }
    // status 0 => game is ready to be started
    this.gameStatus = 0;
    this.isGameOver = false;
    this.playerPts = 0;
    this.botPts = 0;
  }

  addWin() {
    this.selectedHorse.wins++;

    // On every 5 wins => +1 level
    if (this.selectedHorse.wins % 5 == 0) {
      this.selectedHorse.level = this.selectedHorse.wins / 5;
    }

    this.horseService
      .updateHorse(this.selectedHorse.id, this.selectedHorse)
      .catch((err) => {
        this.dialog.open(AlertComponent, {
          data: {
            title: 'ERROR',
            message: err.message,
            color: 'red',
          },
        });
      });
  }

  announceWinner() {
    if (this.winner == 'player') {
      this.dialog.open(AlertComponent, {
        data: {
          title: 'CONGRATULATIONS',
          message: 'YOU HAVE WON THE RACE',
          color: 'green',
        },
      });
      this.addWin();
    } else {
      this.dialog.open(AlertComponent, {
        data: {
          title: 'UNLUCKY',
          message: 'YOU HAVE LOST',
          color: 'red',
        },
      });
    }
  }
}
