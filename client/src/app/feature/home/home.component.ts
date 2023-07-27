import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { HorseService } from 'src/app/core/services/horse.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(
    private authService: AuthService,
    private horseService: HorseService
  ) {}

  get userData() {
    return this.authService.userData;
  }

  getAllHorses() {
    this.horseService.getHorses().subscribe((h) => console.log(h));
  }
}
