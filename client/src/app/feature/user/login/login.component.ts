import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { AuthService } from 'src/app/core/services/auth.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { CustomErrorStateMatcher } from 'src/app/shared/custom-error-state-matcher';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  isBtnDisabled: boolean = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private loaderService: LoaderService
  ) {}

  matcher = new CustomErrorStateMatcher();

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  login() {
    if (this.form.invalid) {
      return;
    }

    const { email, password } = this.form.value;

    this.isBtnDisabled = true;
    this.loaderService.setLoading(true);
    this.authService.login(email!.trim(), password!.trim()).then(() => {
      this.isBtnDisabled = false;
      this.loaderService.setLoading(false);
    });
  }
}
