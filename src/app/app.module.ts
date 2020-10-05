import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import {CommonModule} from '@angular/common'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DefaultModule } from '../app/layouts/default/default.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './layouts/login/login.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuard } from './auth.guard';

import{TokenInterceptorService}from'src/app/services/token-interceptor.service';
import { VirtualcallComponent } from './modules/virtualcall/virtualcall.component';
import { SuscripcionComponent } from './modules/suscripcion/suscripcion.component';
import {BranchChartsComponent} from './modules/branch-charts/branch-charts.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    VirtualcallComponent,
    SuscripcionComponent,
    BranchChartsComponent
    
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
  exports:[NgxSpinnerModule ],
  providers: [
    AuthGuard,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptorService,
      multi:true
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
