import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Horse } from 'src/app/core/models/horse';
import { AuthService } from 'src/app/core/services/auth.service';
import { HorseService } from 'src/app/core/services/horse.service';
import { CustomErrorStateMatcher } from 'src/app/shared/custom-error-state-matcher';

@Component({
  selector: 'app-create-horse',
  templateUrl: './create-horse.component.html',
  styleUrls: ['./create-horse.component.scss'],
})
export class CreateHorseComponent {
  matcher = new CustomErrorStateMatcher();

  constructor(
    private authService: AuthService,
    private horseService: HorseService
  ) {}

  createHorse(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const user = this.authService.userData;

    const { horseName, racingNumber, description } = form.value;

    const horseData: Horse = {
      horseName,
      racingNumber,
      description,
      wins: 0,
      level: 0,
      owner: user.uid,
    };

    this.horseService.createHorse(horseData);

    form.resetForm();
  }
}
