import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private openSidebar$$ = new BehaviorSubject<boolean>(false);
  public isSidebarOpen$ = this.openSidebar$$.asObservable();

  setSidebarOpen(): void {
    this.openSidebar$$.next(!this.openSidebar$$.getValue());
  }

  constructor() {}
}
