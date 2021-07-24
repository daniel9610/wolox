import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  landingItems: Array<{label: string, icon: string}> = [
    {
      "label" : "flexibilidad \n horaria",
      "icon" : "../../assets/Ic_Hour.svg"
    },
    {
      "label" : "Home Office",
      "icon" : "../../assets/Ic_HomeOffice.svg"
    },
    {
      "label" : "Capacitaciones y workshops",
      "icon" : "./../assets/Ic_Workshops.svg"
    },
    {
      "label" : "Snacks, frutas y bebidas gratis",
      "icon" : "../../assets/Ic_DrinkSnacks.svg"
    },
    {
      "label" : "Semana remota",
      "icon" : "../../assets/Ic_laptop.svg"
    },
    {
      "label" : "Trabajar en últimas tecnologías",
      "icon" : "./../assets/Ic_brain.svg"
    }
  
  ];

  constructor() {
   }

  ngOnInit(): void {
  }

}