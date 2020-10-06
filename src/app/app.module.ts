import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import {CommonModule} from '@angular/common'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DefaultModule } from '../app/layouts/default/default.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxSpinnerModule } from 'ngx-spinner';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from 'src/app/services/token-interceptor.service';

<<<<<<< HEAD
import { LoginComponent } from './layouts/login/login.component';
import { RegisterComponent } from './layouts/register/register.component';
import { TermsComponent } from './layouts/terms/terms.component';
import { ForgotComponent } from './layouts/forgot/forgot.component';


=======
import{TokenInterceptorService}from'src/app/services/token-interceptor.service';
import { VirtualcallComponent } from './modules/virtualcall/virtualcall.component';
import { SuscripcionComponent } from './modules/suscripcion/suscripcion.component';
import {BranchChartsComponent} from './modules/branch-charts/branch-charts.component'
>>>>>>> ee55d8ae92977ed46d9419fb4605d028ff0d4ef8

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
<<<<<<< HEAD
    RegisterComponent,
    TermsComponent,
    ForgotComponent
=======
    VirtualcallComponent,
    SuscripcionComponent,
    BranchChartsComponent
    
>>>>>>> ee55d8ae92977ed46d9419fb4605d028ff0d4ef8
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DefaultModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    CommonModule
  ],
  exports: [NgxSpinnerModule],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
