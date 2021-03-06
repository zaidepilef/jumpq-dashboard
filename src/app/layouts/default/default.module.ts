import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module'

import { DefaultComponent } from './default.component';
import { DashboardComponent } from '../../modules/dashboard/dashboard.component';
import { PostsComponent } from 'src/app/modules/posts/posts.component';

import { CustomersComponent } from 'src/app/modules/customers/customers.component';
import { BranchOfficeComponent } from 'src/app/modules/branch-office/branch-office.component';
import { StaffComponent } from 'src/app/modules/staff/staff.component';
import { ProfileComponent } from 'src/app/modules/profile/profile.component';
import { VirtualcallComponent } from 'src/app/modules/virtualcall/virtualcall.component';
import { BranchChartsComponent } from 'src/app/modules/branch-charts/branch-charts.component';
import { SuscripcionComponent } from 'src/app/modules/suscripcion/suscripcion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({

  declarations: [

    DefaultComponent,
    DashboardComponent,
    PostsComponent,
    CustomersComponent,
    BranchOfficeComponent,
    StaffComponent,
    ProfileComponent,
    VirtualcallComponent,
    SuscripcionComponent,
    BranchChartsComponent,
    BranchOfficeComponent

  ],
  imports: [

    CommonModule,
    RouterModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
    
  ]

})


export class DefaultModule { }
