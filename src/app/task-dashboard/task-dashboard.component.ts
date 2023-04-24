import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../interfaces/user.interface';
import { LocalStorageService } from '../services/localStorage';

import { TaskService } from '../services/task.service';

@Component({
  selector: 'task-dashboard',
  templateUrl: './task-dashboard.component.html',
  styleUrls: ['./task-dashboard.component.css'],
})
export class TaskDashboardComponent implements OnInit {
  
  selectedTask: any;
  displayStyle: any = 'none';
  tasks: any[] | undefined = [];
  userData:any;


  constructor(
    private router: Router,
    private readonly taskService : TaskService,
    private readonly localStorage : LocalStorageService
  ) {}

  ngOnInit(): void {

    this.taskService.getAllTaskDetails().subscribe((response) => {
      this.tasks = response;
      console.log('API RESPONSE OF TASK DETAILS LIST : ', this.tasks);
    });

       
  }

  showAddTask(): void {
    this.router.navigate(['/addTask']);

  }

  rowSelected(task: any) {
    this.taskService.getTaskDetailsById(task.id).subscribe((response)=>{
    this.selectedTask=response;
    console.log("After New Changes Selected Row",this.selectedTask);
    })
    this.displayStyle = 'block';
  }

  deleteTask(task: any): void {
    console.log(" INSIDE DELETE TASK API : ", task.id);
    task = {name : task.name , id : task.id}
    this.taskService.deleteTask(task);

  }

  completeTask(task:any):void{
    console.log("Inside Skip Task",task);
    this.taskService.completeTask(task);
  }

  skipTask(task: any):void{
    console.log("Inside Skip Task",task);
    this.taskService.skipTask(task);
  }
  onEvent(event: Event) {
    event.stopPropagation();
  }

  onCloseClickEvent(): void {
    this.displayStyle = 'none';
    this.selectedTask = '';
  }
  buttonShowHide(userName:any):boolean{
    this.userData = this.localStorage.getItem<IUser>('userData');
    if(userName === this.userData.firstName)
    {
      return true;
    }
    return false;
  }

}
