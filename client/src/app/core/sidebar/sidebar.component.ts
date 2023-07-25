import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  constructor(private authService: AuthService, private router: Router) {}

  get isLoggedIn() {
    return this.authService.isLoggedIn;
  }

  logout(): void {
    this.authService.logout();
  }
}
