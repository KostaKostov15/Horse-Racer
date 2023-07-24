import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [HomeComponent, AboutComponent],
  imports: [CommonModule, FormsModule],
  exports: [HomeComponent, AboutComponent],
})
export class FeatureModule {}
