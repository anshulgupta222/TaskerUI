import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { TaskService } from '../services/task.service';

@Component({
  selector: 'task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
})
export class TaskFormComponent implements OnInit {

  possibleWorkerList: any[] = [];
  currentWorkerList: any = [];

  taskForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    workerIds: new FormControl('', [Validators.required]),
    currentWorkerId: new FormControl('', [Validators.required]),
    orderingScheme: new FormControl('', [Validators.required]),
  });

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getUsersList().subscribe((response) => {
      this.possibleWorkerList = response;
      console.log('POSSIBLE WORKER DROPDOWN : ', this.possibleWorkerList);
    });
  }

  getCurrentWorkerList(event: Event) {
    this.currentWorkerList = event;
    console.log('Current Worker List Option', this.currentWorkerList);
  }

  addTask(): void {
    let possibleworkerIdsArray: any = [];

    let possibleWorkerArray = this.taskForm.get('workerIds')?.value;
    console.log(possibleWorkerArray);

    for (let i = 0; i < possibleWorkerArray.length; i++) {
      possibleworkerIdsArray.push(possibleWorkerArray[i].id);
    }

    let newTask = {
      name: this.taskForm.get('name')?.value,
      orderingScheme: this.taskForm.get('orderingScheme')?.value,
      workerIds: possibleworkerIdsArray,
      currentWorkerId: this.taskForm.get('currentWorkerId')?.value,
    };
    console.log('New Task :', newTask);

    if (this.taskForm.valid) {
      console.log('INSIDE ADD TASK METHOD');
      this.taskService.addTask(newTask);
    } else {
      this.taskForm.setErrors({});
    }
  }
}
