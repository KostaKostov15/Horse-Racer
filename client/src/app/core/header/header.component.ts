import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ThemeService } from '../services/theme.service';
import { Observable } from 'rxjs';
import { SidebarService } from '../services/sidebar.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  toggleTheme: FormControl = new FormControl(false);
  isDarkTheme: Observable<boolean>;
  isSidebarOpen: Observable<boolean>;

  constructor(
    private themeService: ThemeService,
    private sidebarService: SidebarService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isDarkTheme = this.themeService.isDarkTheme;
    this.isSidebarOpen = this.sidebarService.isSidebarOpen$;
  }

  toggleDarkTheme(checked: boolean): void {
    this.themeService.setDarkTheme(checked);
  }

  toggleSidebar(): void {
    this.sidebarService.setSidebarOpen();
  }
}
