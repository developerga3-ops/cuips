import { Component } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { HttpResponse } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { HttpEventType } from '@angular/common/http'; // Importa HttpEventType y HttpResponse

import { PDFDocument } from 'pdf-lib';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-table-docs',
  templateUrl: './table-docs.component.html',
  styleUrls: ['./table-docs.component.css'],
})
export class TableDocsComponent {
  descargando = false;

  Empleados!: any[];
  fechaexpira!: string;
  opened: boolean = false;
  selectedNumOrden!: number;
  documentosEmpleado: string[] = [];

  private baseUrl = 'https://acorp-it.com/scripts/API_DockiEagle/pruebas.php';

  openModal(numOrden: number, documentos: string[]) {
    this.selectedNumOrden = numOrden;
    this.documentosEmpleado = documentos; // Add this line
    this.opened = true;
  }

  selectedValues: string[] = [];

  /*getFileNameFromPath(documento: string): string {
    // Implementa esta función para extraer el nombre de archivo de la ruta.
    return documento;
  }*/

  updateSelectedValues(index: number): void {
    const checkboxValue = this.getFileNameFromPath(
      this.documentosEmpleado[index]
    );

    if (this.selectedValues.includes(checkboxValue)) {
      this.selectedValues = this.selectedValues.filter(
        (value) => value !== checkboxValue
      );
    } else {
      this.selectedValues.push(checkboxValue);
    }
  }

  descargarDocumentos(numero: number): void {
    const concatenatedValues = this.selectedValues.join('@');

    // Reiniciar selectedValues a un arreglo vacío
    this.selectedValues = [];
    // Aquí puedes utilizar la cadena concatenada para descargar los documentos o realizar otras acciones.
    this.descargarSeleccion(concatenatedValues, numero);
    console.log('Documentos seleccionados:', concatenatedValues);
  }

  getFileNameFromPath(filePath: string): string {
    return filePath;
  }
  getFileNameFromPath2(filePath: string): string {
    const lastSlashIndex = filePath.lastIndexOf('/');

    if (lastSlashIndex !== -1) {
      // El último carácter '/' fue encontrado
      return filePath.substring(lastSlashIndex + 1);
    } else {
      // No se encontró ningún carácter '/', así que filePath es el nombre del archivo
      return filePath;
    }
  }

  constructor(private servicio: SharedService, private http: HttpClient) {
    this.fechaexpira = '';
  }

  ngOnInit() {
    //this.getEmpleados();
    //this.fechaexpira = '2024-08-02';

    this.fechaexpira = this.obtenerFechaActualFormateada();

    const url = this.obtenerUrlActual();
    const sucursalValue = this.extraerValorDeSucursal(url);
    //console.log('Valor de sucursal:', sucursalValue);

    if (sucursalValue) {
      //* GUARDAR DATO
      localStorage.setItem('sucursal', sucursalValue);

      this.servicio.GetEmpleadoSucursal(sucursalValue).subscribe(
        (Response) => {
          this.Empleados = Response;
        },
        (Error) => {
          console.error(Error);
        }
      );
    } else {
      const storedSucursal = localStorage.getItem('sucursal');
      if (storedSucursal) {
        this.servicio.GetEmpleadoSucursal(storedSucursal).subscribe(
          (Response) => {
            //console.log(Response);
            this.Empleados = Response;
          },
          (Error) => {
            console.error(Error);
          }
        );
      }
    }
  }

  getEmpleados() {
    this.servicio.GetEmpleados().subscribe(
      (response) => {
        //console.log(response);
        this.Empleados = response;
      },
      (error) => console.log(error)
    );
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

  getVerURL(fileURL: string): string {
    const timeQueryParam = `time=${new Date().getTime()}`;
    return `https://acorp-it.com/scripts/API_DockiEagle/${fileURL}?${timeQueryParam}`;
  }

  obtenerUrlActual(): string {
    return window.location.href; // Obtiene las URL actual del navegador
  }

  extraerValorDeSucursal(url: string): string | null {
    const regex = /sucursal=([^&]*)/;
    const match = url.match(regex);
    window.location.href = 'http://localhost:4200/#/home';
    //window.location.href = 'https://acorp-it.com/DockiEagle/#/home';
    return match ? match[1] : null;
  }

  descargar(numeroEmpleado: number): void {
    // Deshabilitar el botón
    this.descargando = true;
    alert('Esperen un momento por favor');

    this.servicio.descargarPDF(numeroEmpleado).subscribe(
      (response) => {
        if (typeof response === 'string' || response instanceof URL) {
          var url = response + `?time=${new Date().getTime()}`;
          console.log('Respuesta del servidor:', url);
          window.open(url); // Convierte response a cadena de texto
          // Habilitar el botón nuevamente después de que se complete la acción
          this.descargando = false;
        } else {
          alert(
            'Ocurrió un error al descargar el PDF. Por favor, inténtalo de nuevo más tarde.'
          );

          console.error('Respuesta no válida:', response);
          // Habilitar el botón nuevamente después de que se complete la acción
          this.descargando = false;
        }
      },
      (error) => {
        console.error('Error al descargar el PDF', error);
        // Habilitar el botón nuevamente después de que se complete la acción
        this.descargando = false;
      }
    );
  }

  descargarSeleccion(seleccion: string, numero: number): void {
    // Deshabilitar el botón
    this.descargando = true;
    alert('Esperen un momento por favor');

    this.servicio.descargarPDFSeleccionados(seleccion, numero).subscribe(
      (response) => {
        if (typeof response === 'string' || response instanceof URL) {
          var url = response + `?time=${new Date().getTime()}`;
          console.log('Respuesta del servidor:', url);
          window.open(url); // Convierte response a cadena de texto
          // Habilitar el botón nuevamente después de que se complete la acción
          this.descargando = false;
          // Reiniciar selectedValues a un arreglo vacío
          this.selectedValues = [];
        } else {
          alert(
            'Ocurrió un error al descargar el PDF. Por favor, inténtalo de nuevo más tarde.'
          );

          console.error('Respuesta no válida:', response);
          // Habilitar el botón nuevamente después de que se complete la acción
          this.descargando = false;
        }
      },
      (error) => {
        console.error('Error al descargar el PDF', error);
        // Habilitar el botón nuevamente después de que se complete la acción
        this.descargando = false;
      }
    );
  }
}
