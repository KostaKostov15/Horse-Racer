import { Component } from '@angular/core';
import { LoaderService } from 'src/app/core/services/loader.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent {
  public isLoading: boolean;
  constructor(private loaderService: LoaderService) {
    this.isLoading = this.loaderService.getLoading();
  }
}
