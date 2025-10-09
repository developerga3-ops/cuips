import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-cuips',
  templateUrl: './cuips.component.html',
  styleUrls: ['./cuips.component.css']
})
export class CuipsComponent implements OnInit {
  radius = 70;
  circumference = 2 * Math.PI * this.radius;

  cuips: any[] = [];
  cuips2: any[] = [];

  constructor(private SharedService: SharedService) { }

  ngOnInit(): void {
    this.SharedService.GetDocumentos().subscribe((data: any[]) => {
      this.cuips2 = data;
      console.log('Datos crudos desde backend:', this.cuips2);

      // Convertir la respuesta a tarjetas
      this.cuips = this.cuips2.map(item => ({
        nombre: `${item.nombre} ${item.paterno} ${item.materno}`,
        numerOrden: item.num_orden,
        planta: item.cliente,
        sucursal: item.sucursal,
        imagen: 'assets/images/images.jpg',
        puesto: item.work_station_name_ || 'Sin puesto',
        turno: item.roll_name_ || 'Sin turno',
        botonTexto: 'Ver más',
        botonClase: 'btn-primary',
        flipped: false,
        showDocsFisicos: false,
        showDocsDigitales: false,
        documentosDigitales: [
          { nombre: 'Acta de Nacimiento', descripcion: 'Documento oficial', entregado: !!item.act_nacimiento },
          { nombre: 'CURP', descripcion: 'Clave Única de Registro', entregado: !!item.curp },
          { nombre: 'Comprobante Domicilio', descripcion: 'Recibo de luz o agua', entregado: !!item.comp_domicilio },
          { nombre: 'INE', descripcion: 'Identificación oficial', entregado: !!item.identificacion_oficial },
          { nombre: 'Constancia de Situación Fiscal', descripcion: 'SAT', entregado: !!item.const_situacionFiscal },
          { nombre: 'Examen Médico', descripcion: 'Aptitud laboral', entregado: !!item.examen_medico },
          { nombre: 'Examen Psicométrico', descripcion: 'Valoración psicológica', entregado: !!item.examen_sicometrico },
          { nombre: 'Examen Toxicológico', descripcion: 'Control antidoping', entregado: !!item.examen_toxicologico },
          { nombre: 'Carta de Antecedentes', descripcion: 'No penales', entregado: !!item.carta_antecedentes }
        ],
        documentosFisicos: [
          { nombre: 'Contrato Empresa', descripcion: 'Firmado', entregado: !!item.contrato_empresa },
          { nombre: 'Contrato Privacidad', descripcion: 'Aviso firmado', entregado: !!item.contrato_privacidad },
          { nombre: 'Adendum Documentos', descripcion: 'Extras', entregado: !!item.adendum_documentos },
          { nombre: 'DC3', descripcion: 'Capacitación', entregado: !!item.dc3 },
          { nombre: 'Seguro Beneficiarios', descripcion: 'Póliza', entregado: !!item.seguro_beneficiarios },
          { nombre: 'Reglamento Interno', descripcion: 'Firmado', entregado: !!item.reglamento_interno },
          { nombre: 'Solicitud Empleo', descripcion: 'Formato RH', entregado: !!item.solicitud_empleo }
        ]
      }));

      console.log('Tarjetas convertidas:', this.cuips);
    });
  }

  toggleFlip(cuip: any) {
    cuip.flipped = !cuip.flipped;
  }

  /** Calcula % de documentos entregados */
  getCompletion(cuip: any): number {
    const docs = [...(cuip.documentosDigitales || []), ...(cuip.documentosFisicos || [])];
    const total = docs.length;
    const entregados = docs.filter(d => d.entregado).length;
    return total > 0 ? (entregados / total) * 100 : 0;
  }

  /** Calcula el offset del anillo */
  getStrokeOffset(cuip: any): number {
    const percent = this.getCompletion(cuip);
    return this.circumference - (percent / 100) * this.circumference;
  }
  getStrokeColor(cuip: any): string {
    const percent = this.getCompletion(cuip);

    let r: number, g: number, b: number;

    if (percent < 50) {

      const ratio = percent / 50;
      r = 220;
      g = Math.round(53 + (187 - 53) * ratio);
      b = 69;
    } else {

      const ratio = (percent - 50) / 50;
      r = Math.round(220 - (220 - 40) * ratio);
      g = Math.round(187 + (167 - 187) * ratio);
      b = 69;
    }

    return `rgb(${r},${g},${b})`;
  }
}
