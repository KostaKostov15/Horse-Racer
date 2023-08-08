import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { CreateHorseComponent } from './create-horse/create-horse.component';
import { UserHorsesComponent } from './user-horses/user-horses.component';
import { RaceComponent } from './race/race.component';

const routes: Routes = [
  {
    path: 'create',
    component: CreateHorseComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'user-horses',
    component: UserHorsesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'race',
    component: RaceComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HorseRoutingModule {}
