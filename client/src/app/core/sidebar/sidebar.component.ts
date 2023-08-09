import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  constructor(private authService: AuthService) {}

  get isLoggedIn() {
    return this.authService.isLoggedIn;
  }

  get userData() {
    return this.authService.userData;
  }

  logout(): void {
    this.authService.logout();
  }
}
