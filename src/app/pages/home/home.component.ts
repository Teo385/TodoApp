import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import {Task} from './../../models/task.model'
import{ FormControl, ReactiveFormsModule, Validators } from '@angular/forms'


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
// ahora task es ua interfaz que me dice la estructura para poder agregar algo a el array
  tasks = signal<Task[]>([
    {
      id: Date.now(),
      title: `crear proyecto` ,
      completed: false,
    },
    {
      id: Date.now(),
      title: `crear componentes `,
      completed: false,
    }
  ]);

  // manejar y darle control a la entrada de valores
  newTaskCtrl = new FormControl('',{
    nonNullable: true,
    validators: [
      Validators.required,
    ]
  }
    
  )
// validacion para no aceptar valores nulos ni espacios (trim quita espacios)
  changeHanler(){
    if(this.newTaskCtrl.valid){
      const value = this.newTaskCtrl.value.trim();
      if (value !== ''){
        this.addTask(value);
        this.newTaskCtrl.setValue('')
      }
    }
  }

  // changeHanler(event: Event){
  //   const input = event.target as HTMLInputElement;
  //   const newTask = input.value;
  //   this.addTask(newTask)
  // }

  addTask(title: string){
    const newTask = {
      id: Date.now(),
      title,
      completed: false
    };
    this.tasks.update((tasks)=> [...tasks, newTask]);
  }

  deleteTalks(index: number){
    this.tasks.update((tasks) => tasks.filter((task, position)=> position !== index))

  }
// es basado en actulizar una pocision en especifico sin mutar el array
  updateTaks(index: number){
    this.tasks.update((tasks) => {
      return tasks.map((task, position) =>{
        if (position === index){
          return {
            ...task,
            completed: !task.completed
          }
        }
        return task;
      })
    })


  }



}
