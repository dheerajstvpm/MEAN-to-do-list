import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from "../../Task"
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})

export class TaskItemComponent {
  @Input() task!: Task;
  faTimes = faTimes;
  @Output() onDeleteTask= new EventEmitter(); 
  @Output() onToggleReminder= new EventEmitter(); 

  onDelete(){
    this.onDeleteTask.emit();
  }

  onToggle(){
    this.onToggleReminder.emit();
  }

}
