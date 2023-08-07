import { Component, OnInit } from '@angular/core';
import { Horse } from 'src/app/core/models/horse';
import { AuthService } from 'src/app/core/services/auth.service';
import { HorseService } from 'src/app/core/services/horse.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  horses: Horse[] = [];

  constructor(
    private authService: AuthService,
    private horseService: HorseService
  ) {}

  ngOnInit(): void {
    this.horseService.getHorses().subscribe((horses) => {
      this.horses = horses;
    });
  }

  get userData() {
    return this.authService.userData;
  }
}
