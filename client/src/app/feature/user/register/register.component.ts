import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { AuthService } from 'src/app/core/services/auth.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { CustomErrorStateMatcher } from 'src/app/shared/custom-error-state-matcher';
import { matchPasswordsValidator } from 'src/app/shared/validators/match-passwords-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  isBtnDisabled: boolean = false;
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

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private loaderService: LoaderService
  ) {}

  register(): void {
    if (this.form.invalid) {
      return;
    }

    const { email, passwordGroup: { password } = {} } = this.form.value;

    this.isBtnDisabled = true;
    this.loaderService.setLoading(true);

    this.authService.register(email!, password!).then(() => {
      this.isBtnDisabled = false;
      this.loaderService.setLoading(false);
    });
  }
}
