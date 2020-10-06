import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import { DefaultComponent } from './layouts/default/default.component';
import { LoginComponent } from './layouts/login/login.component';
import { BranchOfficeComponent } from './modules/branch-office/branch-office.component';
import { CustomersComponent } from './modules/customers/customers.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { StaffComponent } from './modules/staff/staff.component';
import { AuthGuard } from 'src/app/auth.guard';
import { ProfileComponent } from './modules/profile/profile.component';
<<<<<<< HEAD
import { RegisterComponent } from './layouts/register/register.component';
import { TermsComponent } from './layouts/terms/terms.component';
import { ForgotComponent } from './layouts/forgot/forgot.component';

const routes: Routes = [
=======
import {BranchChartsComponent} from './modules/branch-charts/branch-charts.component'
import {SuscripcionComponent} from './modules/suscripcion/suscripcion.component'
import {VirtualcallComponent} from './modules/virtualcall/virtualcall.component'
const routes: Routes =
	[
>>>>>>> ee55d8ae92977ed46d9419fb4605d028ff0d4ef8
		{
			path: '',
			component: DefaultComponent,
			children: [
				{
					path: '',
					component: DashboardComponent
				},
				{
					path: 'profile',
					component: ProfileComponent
				},
				{
					path: 'branchoffice',
					component: BranchOfficeComponent
				},
				{
					path: 'branch-charts',
					component: BranchChartsComponent
				},
				{
					path: 'virtualcall',
					component: VirtualcallComponent
				},
				{
					path: 'Suscripcion',
					component: SuscripcionComponent
				}
			],
			canActivate: [AuthGuard]
		},
		{
			path: 'login',
			component: LoginComponent
		},
		{
			path: 'register',
			component: RegisterComponent
		},
		{
			path: 'forgot',
			component: ForgotComponent
		},
		{
			path: 'terms',
			component: TermsComponent
		}
	];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})

export class AppRoutingModule { }
