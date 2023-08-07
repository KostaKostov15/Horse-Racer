import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  isEditMode: boolean = false;

  constructor(private authService: AuthService) {}

  get userData() {
    return this.authService.userData;
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }

  editProfile(form: NgForm) {
    const { displayName, photoURL } = form.value;
    if (displayName == '' && photoURL == '') {
      this.isEditMode = !this.isEditMode;
      return;
    }

    displayName && this.authService.updateDisplayName(displayName);
    photoURL && this.authService.updatePhotoUrl(photoURL);
    this.isEditMode = !this.isEditMode;
  }

  onCancel() {
    this.isEditMode = !this.isEditMode;
  }
}
