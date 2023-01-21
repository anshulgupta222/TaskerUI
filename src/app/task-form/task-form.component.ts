import { Component} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent{
  
  taskForm = new FormGroup({
    taskName :new FormControl('',[Validators.required]),
    workers : new FormControl('',[Validators.required]),
    currentWorker : new FormControl('',[Validators.required]),
    orderingScheme : new FormControl('',[Validators.required]),
  });

  addTask():void {
    if(this.taskForm.valid){
      console.log(this.taskForm);
      console.log(this.taskForm.get('workers')?.value);
    }
    else{
      this.taskForm.setErrors({});
    }
  }
}
