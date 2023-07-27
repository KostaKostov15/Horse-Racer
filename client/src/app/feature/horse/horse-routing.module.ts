import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { CreateHorseComponent } from './create-horse/create-horse.component';

const routes: Routes = [
  {
    path: 'create',
    component: CreateHorseComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HorseRoutingModule {}
