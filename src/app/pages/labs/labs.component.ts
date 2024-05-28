import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {
  Welcome = 'Hola!';
  tasks = [
    'Instalar el Angular CLI',
    'Crear proyecto',
    'Crear componentes'
  ]
  name = "Mateo";
  age = 23;
  disabled = true;
  img = 'https://w3schools.com/howto/img_avatar.png';
  person ={
    name: 'Teo',
    age: 23,
    avartar:"https://w3schools.com/howto/img_avatar.png"
  }

  clickHandler(){
    alert("Hola Teo")
  }

  changeHanler(event: Event){
    console.log(event)
  }



}
