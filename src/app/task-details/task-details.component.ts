import { Component, EventEmitter, Input, Output} from '@angular/core';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent {

  constructor(private readonly taskService : TaskService){}
  
  @Input() selectedTask: any;
  @Input() displayStyle: any;
  @Output() closeEvent = new EventEmitter();

  closePopup() {
    this.closeEvent.emit();
    this.displayStyle= 'none';
    console.log('Child Component', this.displayStyle);
  }


}
