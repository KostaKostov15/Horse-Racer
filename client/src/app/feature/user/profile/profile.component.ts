import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/core/services/auth.service';
import { AlertComponent } from 'src/app/shared/dialog/alert/alert.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  isEditMode: boolean = false;

  constructor(private authService: AuthService, private dialog: MatDialog) {}

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

    // Update user's displayName
    displayName &&
      this.authService.updateDisplayName(displayName.trim()).catch((err) => {
        this.dialog.open(AlertComponent, {
          data: {
            title: 'ERROR',
            message: err.message,
            color: 'red',
          },
        });
      });

    //Update user's photoURL
    photoURL &&
      this.authService.updatePhotoUrl(photoURL).catch((err) => {
        this.dialog.open(AlertComponent, {
          data: {
            title: 'ERROR',
            message: err.message,
            color: 'red',
          },
        });
      });

    this.isEditMode = !this.isEditMode;
  }

  onCancel() {
    this.isEditMode = !this.isEditMode;
  }
}
