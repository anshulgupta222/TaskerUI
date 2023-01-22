import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Users } from '../interfaces/users';
import { UserDetails } from '../interfaces/user-details';
import { TaskDetail } from '../interfaces/task-detail';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private readonly httpClient: HttpClient) {}

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
      .subscribe((response) => console.log(response));
  }

  getAllTaskDetails(): Observable<TaskDetail[]> {
    return this.httpClient.get<TaskDetail[]>('https://localhost:5001/Task');
  }

  deleteTask(id: number): void {
    console.log('Inside the Delete Task API', id);
    let endPoint = '/' + id;
    this.httpClient
      .delete('https://localhost:5001/Task' + endPoint)
      .subscribe((response) => console.log(response));
    location.reload();
  }
}
