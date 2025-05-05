import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminLoginComponent } from '../../admin-login/admin-login.component';
import { AdminPanelComponent } from '../../admin-panel/admin-panel.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AdminLoginComponent,
    AdminPanelComponent
  ]
})
export class AdminModule { }
