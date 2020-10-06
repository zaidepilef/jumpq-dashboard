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
import { RegisterComponent } from './layouts/register/register.component';
import { TermsComponent } from './layouts/terms/terms.component';
import { ForgotComponent } from './layouts/forgot/forgot.component';

const routes: Routes = [
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
					path: 'customers',
					component: CustomersComponent
				},
				{
					path: 'staff',
					component: StaffComponent
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
