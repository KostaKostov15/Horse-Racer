import { Component } from '@angular/core';
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

  showUser() {
    console.log(this.userData);
  }
}
