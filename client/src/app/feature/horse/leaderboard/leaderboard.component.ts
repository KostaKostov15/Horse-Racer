import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Horse } from 'src/app/core/models/horse';
import { HorseService } from 'src/app/core/services/horse.service';
import { AlertComponent } from 'src/app/shared/dialog/alert/alert.component';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss'],
})
export class LeaderboardComponent implements OnInit {
  horsesData: Horse[] = [];
  dataSource: MatTableDataSource<Horse>;

  displayedColumns: string[] = [
    'ownerEmail',
    'horseName',
    'racingNumber',
    'level',
    'wins',
  ];

  @ViewChild('leaderboardPaginator') paginator: MatPaginator;

  constructor(private horseService: HorseService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.horseService.getHorses().subscribe({
      next: (horses) => {
        // this.horsesData = horses.sort((a, b) => b.wins - a.wins);
        this.dataSource = new MatTableDataSource<Horse>(horses);
        this.dataSource.paginator = this.paginator;
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
