import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Horse } from 'src/app/core/models/horse';
import { AuthService } from 'src/app/core/services/auth.service';
import { HorseService } from 'src/app/core/services/horse.service';
import { CustomErrorStateMatcher } from 'src/app/shared/custom-error-state-matcher';
import { AlertComponent } from 'src/app/shared/dialog/alert/alert.component';

@Component({
  selector: 'app-create-horse',
  templateUrl: './create-horse.component.html',
  styleUrls: ['./create-horse.component.scss'],
})
export class CreateHorseComponent {
  matcher = new CustomErrorStateMatcher();

  constructor(
    private authService: AuthService,
    private horseService: HorseService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  createHorse(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const user = this.authService.userData;

    let { horseName, racingNumber, description } = form.value;

    horseName = horseName.trim();
    racingNumber = racingNumber;
    description = description.trim();

    const horseData: Horse = {
      horseName,
      racingNumber,
      description,
      wins: 0,
      level: 0,
      ownerId: user.uid,
      ownerEmail: user.email,
    };

    this.horseService.createHorse(horseData).catch((err) => {
      this.dialog.open(AlertComponent, {
        data: {
          title: 'ERROR',
          message: err.message,
          color: 'red',
        },
      });
    });

    form.resetForm();

    this.router.navigate(['/horse/user-horses']);
  }
}
