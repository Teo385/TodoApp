import { CommonModule } from '@angular/common';
import { Component, Injector, computed, effect,inject, signal } from '@angular/core';
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
  tasks = signal<Task[]>([]);

  

  filter = signal<'all' | 'Pending' | 'Completed'>('all'); 
  tasksByFilter = computed(() =>{
    const filter = this.filter();
    const tasks = this.tasks();
    if (filter === 'Pending'){
      return tasks.filter(task => !task.completed);
    }
    if (filter === 'Completed'){
      return tasks.filter(task => task.completed)
    }
    return tasks;
  })

  // manejar y darle control a la entrada de valores
  newTaskCtrl = new FormControl('',{
    nonNullable: true,
    validators: [
      Validators.required,
    ]
  })

  constructor(){
    effect (() =>{
      const tasks = this.tasks();
      console.log(tasks)
      localStorage.setItem('tasks', JSON.stringify(tasks))
    })
  }
  ngOnInit(){
    const storage = localStorage.getItem('tasks');
    if(storage){
      const tasks =JSON.parse(storage);
      this.tasks.set(tasks)
    }
  }

  // injector = inject(Injector);

  // ngOnInit(){
  //   const storage = localStorage.getItem('tastks');
  //   if (storage) {
  //     const tasks = JSON.parse(storage);
  //     this.tasks.set(tasks)
  //   }
  // }

  // trackTasks(){
  //   effect(() => {
  //     const tasks = this.tasks();
  //     console.log('hoa')
  //     console.log(tasks);
  //     localStorage.setItem('tasks', JSON.stringify(tasks));
  //   }, { injector: this.injector })
  // }


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
    // this.tasks.mutate(state =>{
    //   state.splice(index, 1)
    // })
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
    
  //  this.tasks.mutate(state =>{
  //   const currentTask = state[index];
  //   state[index] = {
  //     ...currentTask,
  //     completed: !currentTask.completed
  //   }
  //  })
  } 

updateTaskEditingMode(index: number){
  this.tasks.update((prevState) => {
    return prevState.map((task, position) =>{
      if (position === index){
        return {
          ...task,
          editing: true
      }
    }
      return {
        ...task,
        editing: false
      };
    })
  });
}

updateTaskText(index: number, event: Event){
  const input = event.target as HTMLInputElement;
  this.tasks.update((prevState) => {
    return prevState.map((task, position) =>{
      if (position === index){
        return {
          ...task,
          title: input.value,
          editing: false
      }
    }
      return task;
        
    })
  });
}

  changeFilter(filter: 'all' | 'Pending' | 'Completed'){
    this.filter.set(filter);
  }












}











