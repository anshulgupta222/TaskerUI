import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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


  constructor(
    private router: Router,
    private readonly taskService : TaskService
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
    this.selectedTask = task;
    this.displayStyle = 'block';
    console.log('Selected Task is : ', this.selectedTask);
  }

  onCloseClickEvent(): void {
    this.displayStyle = 'none';
  }

  deleteTask(task: any): void {
    console.log(" INSIDE DELETE TASK API : ", task.id);
    task = {name : task.name , id : task.id}
    this.taskService.deleteTask(task);

  }
  onEvent(event: Event) {
    event.stopPropagation();
  }
}
