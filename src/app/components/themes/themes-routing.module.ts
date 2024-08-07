import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ThemesComponent } from './themes.component';
import { NoAuthGuard } from 'src/app/core/guard/noAuth.guard';

const routes: Routes = [
  {
    path: 'home',
    canActivate: [NoAuthGuard],
    component: ThemesComponent
  },
  {
    path: 'theme/:slug',
    component: ThemesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThemesRoutingModule { }
