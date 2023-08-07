import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateHorseComponent } from './create-horse/create-horse.component';
import { MyMaterialModule } from 'src/app/shared/material.module';
import { HorseRoutingModule } from './horse-routing.module';
import { FormsModule } from '@angular/forms';
import { UserHorsesComponent } from './user-horses/user-horses.component';

@NgModule({
  declarations: [CreateHorseComponent, UserHorsesComponent],
  imports: [CommonModule, MyMaterialModule, HorseRoutingModule, FormsModule],
  exports: [CreateHorseComponent, UserHorsesComponent],
})
export class HorseModule {}
