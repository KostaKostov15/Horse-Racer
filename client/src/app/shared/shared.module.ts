import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpinnerComponent } from './spinner/spinner.component';
import { MyMaterialModule } from './material.module';

@NgModule({
  declarations: [SpinnerComponent],
  imports: [CommonModule, MyMaterialModule],
  exports: [SpinnerComponent],
})
export class SharedModule {}
