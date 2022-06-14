import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ITask } from 'src/app/model/itask';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  todoForm!: FormGroup;
  task: ITask[] = [];
  inprogress: ITask[] = [];
  done: ITask[] = [];
  updateIndex!:any;
  isEditEnabled:boolean=false
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      item: ['', Validators.required],
    });
  }

  drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  addTask() {
    this.task.push({
      description: this.todoForm.value.item,
      done: false,
    });
    this.todoForm.reset();
  }

  onEdit(item:ITask, i: number){
    this.todoForm.controls['item'].setValue(item.description);
    this.updateIndex=i;
    this.isEditEnabled=true
  }

  updateTask(){
    this.task[this.updateIndex].description = this.todoForm.value.item;
    this.task[this.updateIndex].done = false;
    this.todoForm.reset();
    this.updateIndex = undefined;
    this.isEditEnabled = false;
  }
  deleteTask(i: number) {
    this.task.splice(i, 1);
  }

  deleteInProgressTask(i: number) {
    this.inprogress.splice(i, 1);
  }

  deleteDoneTask(i: number) {
    this.done.splice(i, 1);
  }
}
