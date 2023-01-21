import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetTasksDetailsService } from '../services/get-tasks-details.service';

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
    private readonly getTasks: GetTasksDetailsService
  ) {}

  ngOnInit(): void {

    this.getTasks.getTaskDetails().subscribe((response) => {
      this.tasks = response;
      console.log('API RESPONSE : ', this.tasks);
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

  removeRow(task: any): void {
    console.log("Inside Parent Component's Remove Row Methood", task);
  }
  onEvent(event: Event) {
    event.stopPropagation();
  }
}
