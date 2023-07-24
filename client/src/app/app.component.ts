import { Component, OnInit } from '@angular/core';
import { ThemeService } from './core/services/theme.service';
import { Observable } from 'rxjs';
import { SidebarService } from './core/services/sidebar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isDarkTheme: Observable<boolean>;
  isSidebarOpen: Observable<boolean>;

  constructor(
    private themeService: ThemeService,
    private sidebarService: SidebarService
  ) {}

  ngOnInit() {
    this.isDarkTheme = this.themeService.isDarkTheme;
    this.isSidebarOpen = this.sidebarService.isSidebarOpen;
  }
}
