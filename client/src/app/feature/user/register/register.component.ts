import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { AuthService } from 'src/app/core/services/auth.service';
import { CustomErrorStateMatcher } from 'src/app/shared/custom-error-state-matcher';
import { matchPasswordsValidator } from 'src/app/shared/validators/match-passwords-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  matcher = new CustomErrorStateMatcher();

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    passwordGroup: this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(6)]],
        rePassword: ['', [Validators.required]],
      },
      {
        validators: [matchPasswordsValidator('password', 'rePassword')],
      }
    ),
  });

  constructor(private authService: AuthService, private fb: FormBuilder) {}

  register(): void {
    if (this.form.invalid) {
      return;
    }

    const { email, passwordGroup: { password } = {} } = this.form.value;

    this.authService.register(email!, password!);
  }
}
