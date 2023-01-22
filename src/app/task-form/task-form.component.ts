import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { TaskService } from '../services/task.service';

@Component({
  selector: 'task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
})
export class TaskFormComponent implements OnInit {
  usersList: any[] | undefined = [];

  taskForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    workerIds: new FormControl('', [Validators.required]),
    currentWorkerId: new FormControl('', [Validators.required]),
    orderingScheme: new FormControl('', [Validators.required]),
  });

  constructor(
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.taskService.getUsersList().subscribe((response) => {
      this.usersList = response;
      console.log("API RESPONSE OF USERS DETAIL FOR DROPDOWN : ",this.usersList);
    });
  }

  addTask(): void {
    if (this.taskForm.valid) {
      console.log("INSIDE ADD TASK METHOD",this.taskForm.value);
      this.taskService.addTask(this.taskForm.value);
    } else {
      this.taskForm.setErrors({});
    }
  }
}
