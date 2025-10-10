import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private API_getEmpleados =
    'https://acorp-it.com/scripts/API_DockiEagle/getEmpleados.php';
  private API_getEmpleado =
    'https://acorp-it.com/scripts/API_DockiEagle/getEmpleado.php?employee_id_=';
  private API_getEmpleadosSucursal =
    'https://acorp-it.com/scripts/API_DockiEagle/getEmpleadosSucursal.php?sucursal=';
  private API_postDescargar =
    'https://acorp-it.com/scripts/API_DockiEagle/descargarPDF.php';
  private API_Documentos = 
    'https://acorp-it.com/scripts/API_DockiEagle/getDocumentos.php';



  private baseUrl = 'https://acorp-it.com/scripts/API_DockiEagle/pruebas.php';
  private baseUrl2 = 'https://acorp-it.com/scripts/API_DockiEagle/pruebas2.php';

  constructor(private http: HttpClient) {}

  public GetEmpleados(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_getEmpleados}`);
  }

  public GetEmpleado(employee_id_: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_getEmpleado}${employee_id_}`);
  }

  public GetEmpleadoSucursal(sucursal: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_getEmpleadosSucursal}${sucursal}`);
  }
  public enviarJson(jsonData: any): Observable<any> {
    return this.http.post(this.API_postDescargar, jsonData);
  }

  public GetDocumentos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_Documentos}`);
  }

  descargarPDF(numeroEmpleado: number): Observable<any[]> {
    const url = `${this.baseUrl}?numero_empleado=${numeroEmpleado}`;
    return this.http.get<any[]>(url);
  }

  descargarPDFSeleccionados(
    seleccion: string,
    numeroEmpleado: number
  ): Observable<any[]> {
    const url = `${this.baseUrl2}?seleccion=${seleccion}&numero_empleado=${numeroEmpleado}`;
    return this.http.get<any[]>(url);
  }

}
