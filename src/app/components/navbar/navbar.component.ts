import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  fechaexpira!: string;

  constructor(){
    this.fechaexpira = '';
  }


  ngOnInit() {
    //this.fechaexpira = '2024-08-02';
    this.fechaexpira = this.obtenerFechaActualFormateada();
  }

  obtenerFechaActualFormateada(): string {
    const currentDate = new Date(); // Get the current date as a Date object
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Months are 0-indexed
    const day = currentDate.getDate();

    // Pad the month and day with leading zeros if needed
    const formattedMonth = month < 10 ? `0${month}` : `${month}`;
    const formattedDay = day < 10 ? `0${day}` : `${day}`;

    return `${year}-${formattedMonth}-${formattedDay}`;
  }
}
