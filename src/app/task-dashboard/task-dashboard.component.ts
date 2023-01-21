import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'task-dashboard',
  templateUrl: './task-dashboard.component.html',
  styleUrls: ['./task-dashboard.component.css'],
})
export class TaskDashboardComponent {
  selectedTask:any;
  displayStyle:any="none";

  tasks: any = [
    { taskName: 'Cleaning', currentWorker: 'Anshul', nextWorker: 'Digvijay' },
    { taskName: 'Cooking', currentWorker: 'Tejas', nextWorker: 'Harsh' },
    { taskName: 'Washing', currentWorker: 'Digvijay', nextWorker: 'Tejas' },
    { taskName: 'Shopping', currentWorker: 'Harsh', nextWorker: 'Anshul' },
  ];

  constructor(private router: Router) {}

  showAddTask(): void {
    this.router.navigate(['/addTask']);
  }

  rowSelected(task: any) {
    this.selectedTask = task;
    this.displayStyle="block";
    console.log("Selected Task is : ",this.selectedTask)
    
  }
  onCloseClickEvent():void{
    this.displayStyle = "none";
  }
  
  removeRow(task:any):void{

    console.log("Inside Parent Component's Remove Row Methood" ,task);
  }
  onEvent(event :Event) {
    event.stopPropagation();
 }
}
