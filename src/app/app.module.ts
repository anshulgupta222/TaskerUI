import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module'

import { AppComponent } from './app.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { HeaderInterceptor } from './interceptor/header.interceptor';
import { TaskFormComponent } from './task-form/task-form.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { TaskDashboardComponent } from './task-dashboard/task-dashboard.component';



@NgModule({
  declarations: [
    AppComponent,
    RegistrationFormComponent,
    LoginFormComponent,
    TaskFormComponent,
    TaskDetailsComponent,
    TaskDashboardComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({positionClass: 'toast-top-center'})
  ],
  providers: [{provide: HTTP_INTERCEPTORS,
    useClass: HeaderInterceptor,
    multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
