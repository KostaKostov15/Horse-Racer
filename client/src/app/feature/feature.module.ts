import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { MyMaterialModule } from '../shared/material.module';

@NgModule({
  declarations: [HomeComponent, AboutComponent],
  imports: [CommonModule, MyMaterialModule],
  exports: [HomeComponent, AboutComponent],
})
export class FeatureModule {}
