import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminlandingComponent } from './adminlanding/adminlanding.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AdminsComponent } from './admins/admins.component';
import { TownsComponent } from './towns/towns.component';
import { CropsComponent } from './crops/crops.component';
import { FarmersComponent } from './farmers/farmers.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecommendationsComponent } from './recommendations/recommendations.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';


@NgModule({
  declarations: [
    AdminlandingComponent,
    DashboardComponent,
    HeaderComponent,
    SidebarComponent,
    AdminsComponent,
    TownsComponent,
    CropsComponent,
    FarmersComponent,
    RecommendationsComponent,
    ChangepasswordComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
