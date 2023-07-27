import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CustomErrorStateMatcher } from 'src/app/shared/custom-error-state-matcher';

@Component({
  selector: 'app-create-horse',
  templateUrl: './create-horse.component.html',
  styleUrls: ['./create-horse.component.scss'],
})
export class CreateHorseComponent {
  matcher = new CustomErrorStateMatcher();

  createHorse(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const { horseName, racingNumber, description } = form.value;

    console.log(horseName, racingNumber, description);

    form.resetForm();
  }
}
