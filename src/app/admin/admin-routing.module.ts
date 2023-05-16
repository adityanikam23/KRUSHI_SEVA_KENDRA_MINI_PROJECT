import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminlandingComponent } from './adminlanding/adminlanding.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminsComponent } from './admins/admins.component';
import { CropsComponent } from './crops/crops.component';
import { FarmersComponent } from './farmers/farmers.component';
import { TownsComponent } from './towns/towns.component';
import { RecommendationsComponent } from './recommendations/recommendations.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';

const routes: Routes = [
  {path:"", component:AdminlandingComponent, children:[
    {path:"dashboard", component:DashboardComponent},
    {path:"dashboard", component:DashboardComponent},
    {path:"admins", component:AdminsComponent},
    {path:"crops", component:CropsComponent},
    {path:"farmers", component:FarmersComponent},
    {path:"towns", component:TownsComponent},
    {path:"recommendations/:farmerid", component:RecommendationsComponent},
    {path:"changepassword/:adminid", component:ChangepasswordComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
