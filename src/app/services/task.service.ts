import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Users } from '../interfaces/users';
import { UserDetails } from '../interfaces/user-details';
import { TaskDetail } from '../interfaces/task-detail';
import { ToastrService } from 'ngx-toastr';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly toastr: ToastrService,
    private readonly router: Router
  ) {}

  getUsersList(): Observable<Users[]> {
    return this.httpClient
      .get<UserDetails>('https://localhost:5001/Users')
      .pipe(map((response) => response.data));
  }

  addTask(addTask: {
    name: string;
    workerIds: number[];
    currentWorkerId: number;
    orderingScheme: number;
  }): void {
    this.httpClient
      .post<TaskDetail | null>('https://localhost:5001/Task', addTask)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (
            error.status == 401 ||
            error.status == 400 ||
            error.status == 500
          ) {
            this.toastr.error('Something Went Wrong');
            console.log(error.message);
          } else {
            console.log('Inside Add Task API Error Handling Block');
          }
          return of(null);
        })
      )
      .subscribe((response) => {
        if (response) {
          console.log(response);
          this.toastr.success('New Task is added');
          setTimeout(() => {
            this.router.navigate(['/taskDashboard']);
          }, 2500);
        }
      });
  }

  getAllTaskDetails(): Observable<TaskDetail[]> {
    return this.httpClient.get<TaskDetail[]>('https://localhost:5001/Task');
  }

  deleteTask(task: { name: string; id: number }): void {
    console.log(' Calling Delete Task API', task.id, task.name);
    let endPoint = '/' + task.id;
    this.httpClient
      .delete('https://localhost:5001/Task' + endPoint)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (
            error.status == 401 ||
            error.status == 400 ||
            error.status == 404 ||
            error.status == 500
          ) {
            this.toastr.error('Not Able to Delete');
            console.log(error.message);
          } else {
            console.log('Delete API : Inside Else of Error Handling');
          }
          return of(1);
        })
      )
      .subscribe((response) => {
        if(response == null){
          console.log(response)
          this.toastr.success(task.name +' task is removed');
          setTimeout(() => {
          location.reload();
          }, 2000);
        }
        
      });
  }
}
