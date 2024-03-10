import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  conversations = [
    {
      name: "David",
      time: "22:00 PM",
      message: "Good night",
      readMessage:false
    },
    {
      name: "Jão",
      time: "23:00 PM",
      message: "Foda kkkk",
      readMessage:true
    },
    {
      name: "Fernanda",
      time: "24:00 PM",
      message: "Vai dormir",
      readMessage:false
    },
    {
      name: "Maria",
      time: "01:00 AM",
      message: "Lebron",
      readMessage:false
    },
    {
      name: "Suzana",
      time: "02:00 AM",
      message: "Volei é legal",
      readMessage:true
    },
    {
      name: "Raphael",
      time: "03:00 AM",
      message: "Sei de nada",
      readMessage:false
    },
    {
      name: "Mariana",
      time: "04:00 AM",
      message: "É isso ai",
      readMessage:true
    },
    {
      name: "Emanuele",
      time: "05:00 AM",
      message: "Não conheço",
      readMessage:false
    },
    {
      name: "Guilherme",
      time: "06:00 AM",
      message: "kkkkkkkk",
      readMessage:true
    },
    {
      name: "Felipinos",
      time: "07:00 AM",
      message: "Seu cu",
      readMessage:true
    },
    {
      name: "Renan",
      time: "08:00 AM",
      message: "Vem na biblio",
      readMessage:false
    },
    {
      name: "Gabriela",
      time: "09:00 AM",
      message: "A book on the table",
      readMessage:true
    },
    {
      name: "Gabriel",
      time: "10:00 AM",
      message: "At james desk",
      readMessage:true
    },
    {
      name: "Gary",
      time: "11:00 AM",
      message: "Tomorrow",
      readMessage:false
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
