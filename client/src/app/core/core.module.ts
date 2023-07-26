import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { SidebarComponent } from './sidebar/sidebar.component';
import { MyMaterialModule } from '../shared/material.module';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, SidebarComponent],
  imports: [ReactiveFormsModule, CommonModule, RouterModule, MyMaterialModule],
  exports: [HeaderComponent, FooterComponent, SidebarComponent],
})
export class CoreModule {}
