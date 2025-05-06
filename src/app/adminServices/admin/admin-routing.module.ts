import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from '../../admin-login/admin-login.component';
import { AdminPanelComponent } from '../../admin-panel/admin-panel.component';
import { loginGuard } from '../login.guard';

const routes: Routes = [

  {path:'', component:AdminLoginComponent},
  {path:'dashboard', component:AdminPanelComponent, canActivate: [loginGuard]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
