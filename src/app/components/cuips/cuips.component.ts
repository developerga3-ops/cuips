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
      this.cuips = this.cuips2.map(item => {
        const hoy = new Date();

        const fechaIngreso = item.entry_date_ ? new Date(item.entry_date_) : null;
        let mesesAntiguedad = 0;

        if (fechaIngreso) {
          mesesAntiguedad = (hoy.getFullYear() - fechaIngreso.getFullYear()) * 12 + (hoy.getMonth() - fechaIngreso.getMonth());
        }

        // Determinar estado del CUIP
        let estadoCuip = '';
        if (item.cuip_status === "0" && mesesAntiguedad >=3 && mesesAntiguedad < 12) {
          estadoCuip = 'Nuevo ingreso (requiere curso de CUIP)';
        } else if (mesesAntiguedad >= 11 && mesesAntiguedad <12) {
          estadoCuip = 'Renovación de CUIP próxima'
        } else if (mesesAntiguedad >= 12) {
          estadoCuip = 'CUIP vencida'
        } else {
          estadoCuip = 'CUIP vigente'
        }

        return {
          nombre: `${item.nombre} ${item.paterno} ${item.materno}`,
          numerOrden: item.num_orden,
          planta: item.cliente,
          sucursal: item.sucursal,
          imagen: 'assets/images/images.jpg',
          puesto: item.work_station_name_ || 'Sin puesto',
          turno: item.roll_name_ || 'Sin turno',
          estadoCuip,
          fechaIngreso: item.entry_date_,
          botonTexto: 'Ver más',
          botonClase: 'btn-primary',
          flipped: false,
          showDocsFisicos: false,
          showDocsDigitales: false,

          // DIGITALES
          documentosDigitales: [
            { nombre: 'Acta de Nacimiento', descripcion: 'Documento oficial', entregado: this.isDocumentoDigital(item.act_nacimiento)},
            { nombre: 'CURP', descripcion: 'Clave Única de Registro', entregado:this.isDocumentoDigital(item.curp)},
            { nombre: 'Comprobante Domicilio', descripcion: 'Recibo de luz o agua', entregado: this.isDocumentoDigital(item.comp_domicilio)},
            { nombre: 'INE', descripcion: 'Identificación oficial', entregado: this.isDocumentoDigital(item.identificacion_oficial)},
            { nombre: 'Constancia de Situación Fiscal', descripcion: 'SAT', entregado:this.isDocumentoDigital(item.const_situacionFiscal)},
            { nombre: 'Examen Médico', descripcion: 'Aptitud laboral', entregado: this.isDocumentoDigital(item.examen_medico)},
            { nombre: 'Examen Psicométrico', descripcion: 'Valoración psicológica', entregado: this.isDocumentoDigital(item.examen_sicometrico)},
            { nombre: 'Examen Toxicológico', descripcion: 'Control antidoping', entregado: this.isDocumentoDigital(item.examen_toxicologico)},
            { nombre: 'Carta de Antecedentes', descripcion: 'No penales', entregado: this.isDocumentoDigital(item.carta_antecedentes) }
          ],

          // FÍSICOS
          documentosFisicos: [
            { nombre: 'Contrato Empresa', descripcion: 'Firmado', entregado: !!item.contrato_empresa, vigente: this.isDocumentoVigente(item.currentDate_) },
            { nombre: 'Contrato Privacidad', descripcion: 'Aviso firmado', entregado: !!item.contrato_privacidad, vigente: this.isDocumentoVigente(item.currentDate_) },
            { nombre: 'Adendum Documentos', descripcion: 'Extras', entregado: !!item.adendum_documentos, vigente: this.isDocumentoVigente(item.currentDate_) },
            { nombre: 'DC3', descripcion: 'Capacitación', entregado: !!item.dc3 },
            { nombre: 'Seguro Beneficiarios', descripcion: 'Póliza', entregado: !!item.seguro_beneficiarios, vigente: this.isDocumentoVigente(item.currentDate_) },
            { nombre: 'Reglamento Interno', descripcion: 'Firmado', entregado: !!item.reglamento_interno, vigente: this.isDocumentoVigente(item.currentDate_) },
            { nombre: 'Solicitud Empleo', descripcion: 'Formato RH', entregado: !!item.solicitud_empleo, vigente: this.isDocumentoVigente(item.currentDate_) }
          ]
        }

      });

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

  isDocumentoVigente (fechaStr: string | null): boolean {
  if (!fechaStr) return false
  
  const fechaDoc = new Date(fechaStr);
  const hoy = new Date();

  const diffMeses = (hoy.getFullYear() - fechaDoc.getFullYear()) * 12 + (hoy.getMonth() - fechaDoc.getMonth());
  
  return diffMeses < 6;
}

  isDocumentoDigital (link: string | null): boolean {
    if (!link) return false;
     return /\.pdf$/i.test(link.trim());
  }

}


