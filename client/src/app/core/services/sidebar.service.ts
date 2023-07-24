import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private _openSidebar = new BehaviorSubject<boolean>(false);
  public isSidebarOpen = this._openSidebar.asObservable();

  setSidebarOpen(): void {
    this._openSidebar.next(!this._openSidebar.getValue());
  }

  constructor() {}
}
