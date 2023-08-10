import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { MyMaterialModule } from '../shared/material.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HomeComponent, AboutComponent],
  imports: [CommonModule, MyMaterialModule, RouterModule],
  exports: [HomeComponent, AboutComponent],
})
export class FeatureModule {}
