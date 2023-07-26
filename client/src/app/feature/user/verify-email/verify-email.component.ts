import { Component } from '@angular/core';
import { User } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss'],
})
export class VerifyEmailComponent {
  constructor(private authService: AuthService) {}

  sendVerificationEmail() {
    this.authService.sendVerificationMail();
  }

  get userData() {
    return this.authService.userData;
  }
}
