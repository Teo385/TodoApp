import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import{ FormControl, ReactiveFormsModule } from '@angular/forms'

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {

  Welcome = 'Hola!';
  tasks = signal([
    'Instalar el Angular CLI',
    'Crear proyecto',
    'Crear componentes'
  ])
  // un signal es para que saber que hubo un cambio y ya con esto se puede actualizar o  hacer una reaccion en cadena con ese dato (señal)
  name = signal("Mateo");
  age = 23;
  disabled = true;
  img = 'https://w3schools.com/howto/img_avatar.png';

  person =signal({
    name: 'Teo',
    age: 23,
    avartar:"https://w3schools.com/howto/img_avatar.png"
  });

  colorCtrl = new FormControl();
  // esta es la manera de ver el cambio pero desde la logica
  constructor(){
    this.colorCtrl.valueChanges.subscribe(value =>{
      console.log(value);
    })
  }

  clickHandler(){
    alert("Hola Teo")
  }

  // para ver los cambios 
  changeHanler(event: Event){
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.name.set(newValue);
  }

  keydownHanler(event: KeyboardEvent ){
    const input = event.target as HTMLInputElement;
    console.log(input.value);
  }

  changeAge(event: Event){
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.person.update(prevState =>{
      return{
        ...prevState,
        age: parseInt(newValue,10)
      }
    });
  }



  changeName(event: Event){
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.person.update(prevState =>{
      return{
        ...prevState,
        name: newValue
      }
    });
  }

  





}
