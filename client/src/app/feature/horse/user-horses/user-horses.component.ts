import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Horse } from 'src/app/core/models/horse';
import { User } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { HorseService } from 'src/app/core/services/horse.service';
import { AlertComponent } from 'src/app/shared/dialog/alert/alert.component';

@Component({
  selector: 'app-user-horses',
  templateUrl: './user-horses.component.html',
  styleUrls: ['./user-horses.component.scss'],
})
export class UserHorsesComponent implements OnInit {
  dialogResult: string;
  userHorses: Horse[] = [];
  user: User;
  displayedColumns: string[] = [
    'racingNumber',
    'horseName',
    'level',
    'wins',
    'description',
    'delete',
  ];

  constructor(
    private horseService: HorseService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.user = this.authService.currentUser;
    this.horseService
      .getUserHorses(this.authService.currentUser.uid)
      .subscribe({
        next: (horses) => {
          this.userHorses = horses.sort((a, b) => b.wins - a.wins);
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

  deleteHorse(horse: Horse | any) {
    const choice = confirm(
      `Are you sure you want to delete ${horse.horseName}`
    );

    if (choice) {
      this.horseService.deleteHorse(horse.id).catch((err) => {
        this.dialog.open(AlertComponent, {
          data: {
            title: 'ERROR',
            message: err.message,
            color: 'red',
          },
        });
      });
    }
  }
}
