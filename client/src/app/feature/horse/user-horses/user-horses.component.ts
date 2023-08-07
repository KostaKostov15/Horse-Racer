import { Component, OnInit } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { Horse } from 'src/app/core/models/horse';
import { AuthService } from 'src/app/core/services/auth.service';
import { HorseService } from 'src/app/core/services/horse.service';

@Component({
  selector: 'app-user-horses',
  templateUrl: './user-horses.component.html',
  styleUrls: ['./user-horses.component.scss'],
})
export class UserHorsesComponent implements OnInit {
  userHorses: Horse[] = [];

  constructor(
    private horseService: HorseService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.horseService
      .getUserHorses(this.authService.currentUser.uid)
      .subscribe((horses) => {
        this.userHorses = horses;
      });
  }
}
