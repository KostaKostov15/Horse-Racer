import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  constructor(private authService: AuthService) {}

  get userData() {
    return this.authService.userData;
  }

  updateUsername(inputUsername: string) {
    this.authService.updateDisplayName(inputUsername);
  }

  updatePhotoURL(inputPhotoURL: string) {
    this.authService.updatePhotoUrl(inputPhotoURL);
  }
}
