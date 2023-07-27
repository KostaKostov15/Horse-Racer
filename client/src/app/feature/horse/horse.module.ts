import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateHorseComponent } from './create-horse/create-horse.component';
import { MyMaterialModule } from 'src/app/shared/material.module';
import { HorseRoutingModule } from './horse-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CreateHorseComponent],
  imports: [CommonModule, MyMaterialModule, HorseRoutingModule, FormsModule],
  exports: [CreateHorseComponent],
})
export class HorseModule {}
