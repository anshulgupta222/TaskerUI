import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { TaskService } from '../services/task.service';

@Component({
  selector: 'task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
})
export class TaskFormComponent implements OnInit {

  possibleWorkerList: any = [];
  dropdownSettings: any;
  currentWorkerList: any = [];
  subDropdownSettings: any;

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

    this.taskForm.get('workerIds')?.valueChanges.subscribe((response) => {
      this.currentWorkerList = response;
    });

    this.dropdownSettings = {
      idField: 'id',
      textField: 'firstName',
    };

    this.subDropdownSettings = {
      idField: 'id',
      textField: 'firstName',
      enableCheckAll: false,
      limitSelection: 1,
    };
  }

  addTask(): void {
    let possibleworkerIdsArray: any = [];
    let currentWorker: any;

    let possibleWorkerArray = this.taskForm.get('workerIds')?.value;

    for (let i = 0; i < possibleWorkerArray.length; i++) {
      possibleworkerIdsArray.push(possibleWorkerArray[i].id);
    }

    let currentWorkerArray = this.taskForm.get('currentWorkerId')?.value;

    for (let i = 0; i < currentWorkerArray?.length; i++) {
      currentWorker = currentWorkerArray[i].id;
    }

    let newTask = {
      name: this.taskForm.get('name')?.value,
      orderingScheme: this.taskForm.get('orderingScheme')?.value,
      workerIds: possibleworkerIdsArray,
      currentWorkerId: currentWorker,
    };

    console.log('New Task :', newTask);

    if (this.taskForm.valid) {
      console.log('INSIDE ADD TASK METHOD');
      this.taskService.addTask(newTask);
    } else {
      this.taskForm.setErrors({});
    }
  }

  onItemSelect(item: any): void {}

  onSelectAll(items: any) {}

  public onDeSelect(item: any) {}

  public onDeSelectAll(items: any) {}
}
