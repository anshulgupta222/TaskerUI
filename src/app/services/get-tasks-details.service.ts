import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskDetail } from '../interfaces/task-detail';

@Injectable({
  providedIn: 'root'
})
export class GetTasksDetailsService {

  constructor(private readonly httpClient: HttpClient){}

getTaskDetails ():Observable<TaskDetail[]> {
      return this.httpClient.get<TaskDetail[]> ('https://localhost:5001/Task');
   }

}
