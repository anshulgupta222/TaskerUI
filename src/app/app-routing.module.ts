import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';

import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { TaskDashboardComponent } from './task-dashboard/task-dashboard.component';
import { TaskDetailsComponent } from './task-details/task-details.component';

const routes : Routes = [
  {path:'login', component: LoginFormComponent},
  {path:'register', component: RegistrationFormComponent},
  {path:'addTask', component: TaskFormComponent},
  {path:'taskDashboard', component: TaskDashboardComponent},
  {path:'showTaskDetails', component: TaskDetailsComponent}
]
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
