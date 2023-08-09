import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Horse } from 'src/app/core/models/horse';
import { User } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { HorseService } from 'src/app/core/services/horse.service';
import { AlertComponent } from 'src/app/shared/dialog/alert/alert.component';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss'],
})
export class LeaderboardComponent implements OnInit {
  horsesData: Horse[] = [];
  displayedColumns: string[] = ['racingNumber', 'horseName', 'level', 'wins'];

  constructor(
    private horseService: HorseService,
    private dialog: MatDialog,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.horseService.getHorses().subscribe({
      next: (horses) => {
        this.horsesData = horses.sort((a, b) => b.wins - a.wins);
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
}
