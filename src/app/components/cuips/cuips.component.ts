import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import Swal from 'sweetalert2';

interface Documento {
  nombre: string;
  descripcion: string;
  entregado: boolean;
}

interface Cuip {
  nombre: string;
  numerOrden: string | number;
  planta: string;
  sucursal: string;
  imagen: string;
  puesto: string;
  turno: string;
  estadoCuip: string;
  fechaIngreso?: string;
  fecha_examen_cuip?: string;
  cuip_url?: string;
  examen_cuip_status?: number;
  botonTexto: string;
  botonClase: string;
  flipped: boolean;
  showDocsDigitales: boolean;
  documentosDigitales: Documento[];
  preparacion_cuip_status: number;
  examen_cuip?: number;
  folio_cuip?: number;
  cursoCuip?: boolean | string;
  autorizado?: boolean;
}

@Component({
  selector: 'app-cuips',
  templateUrl: './cuips.component.html',
  styleUrls: ['./cuips.component.css']
})
export class CuipsComponent implements OnInit {
  radius = 70;
  circumference = 2 * Math.PI * this.radius;

  cuips: Cuip[] = [];
  cuips2: Cuip[] = [];

  filtroSeleccionado: string = 'todos';
  busquedaOrden: string = '';

  plantas: string[] = [];
  sucursales: string[] = [];
  puestos: string[] = [];
  plantaSeleccionada: string = '';
  sucursalSeleccionada: string = '';
  puestoSeleccionado: string = '';

  // Leyenda de colores actualizada según flujo
  etapas = [
    { nombre: 'Nada', color: 'lightgray' },
    { nombre: 'Documentos incompletos', color: 'rgb(220,53,69)' },
    { nombre: 'Expediente completo', color: 'rgb(255,165,0)' },
    { nombre: 'Autorizados', color: 'rgb(255,255,0)' },
    { nombre: 'Curso completo', color: 'rgb(40,187,69)' },
    { nombre: 'CUIP recibida', color: 'rgb(0,123,255)' },
  ];

  constructor(private SharedService: SharedService) { }

  ngOnInit(): void {
    this.SharedService.GetDocumentos().subscribe((data: any[]) => {
      this.cuips2 = data.map(item => this.crearTarjetaCuip(item));

      // Extraer listas únicas de planta, sucursal y puesto
      this.plantas = [...new Set(this.cuips2.map(c => c.planta).filter(Boolean))];
      this.sucursales = [...new Set(this.cuips2.map(c => c.sucursal).filter(Boolean))];
      this.puestos = [...new Set(this.cuips2.map(c => c.puesto).filter(Boolean))];

      this.aplicarFiltro();
    });
  }

  crearTarjetaCuip(item: any): Cuip {
    const hoy = new Date();
    const fechaIngreso = item.entry_date_ ? new Date(item.entry_date_) : null;
    let mesesAntiguedad = 0;

    if (fechaIngreso) {
      mesesAntiguedad = (hoy.getFullYear() - fechaIngreso.getFullYear()) * 12 + (hoy.getMonth() - fechaIngreso.getMonth());
    }

    let estadoCuip = '';
    if (item.cuip_status === "0" && mesesAntiguedad >= 3 && mesesAntiguedad < 12) {
      estadoCuip = 'Nuevo ingreso (requiere curso de CUIP)';
    } else if (mesesAntiguedad >= 11 && mesesAntiguedad < 12) {
      estadoCuip = 'Renovación de CUIP próxima';
    } else if (mesesAntiguedad >= 12) {
      estadoCuip = 'CUIP vencida';
    } else {
      estadoCuip = 'CUIP vigente';
    }

    return {
      nombre: `${item.nombre} ${item.paterno} ${item.materno}`,
      numerOrden: item.num_orden,
      planta: item.cliente,
      sucursal: item.sucursal,
      imagen: item.foto && item.foto.trim() !== '' ? item.foto : 'assets/images/avatar.jpeg',
      puesto: item.work_station_name_ || 'Sin puesto',
      turno: item.roll_name_ || 'Sin turno',
      estadoCuip,
      fechaIngreso: item.entry_date_,
      fecha_examen_cuip: item.fecha_examen_cuip,
      cuip_url: item.cuip_url,
      examen_cuip_status: item.examen_cuip_status,
      examen_cuip: item.examen_cuip,
      folio_cuip: item.folio_cuip,
      botonTexto: 'Ver más',
      botonClase: 'btn-primary',
      flipped: false,
      showDocsDigitales: false,
      documentosDigitales: [
        { nombre: 'Acta de Nacimiento', descripcion: 'Documento oficial', entregado: this.isDocumentoDigital(item.act_nacimiento) },
        { nombre: 'CURP', descripcion: 'Clave Única de Registro', entregado: this.isDocumentoDigital(item.curp) },
        { nombre: 'Comprobante Domicilio', descripcion: 'Recibo de luz o agua', entregado: this.isDocumentoDigital(item.comp_domicilio) },
        { nombre: 'INE', descripcion: 'Identificación oficial', entregado: this.isDocumentoDigital(item.identificacion_oficial) },
        { nombre: 'Examen Médico', descripcion: 'Valoración médica', entregado: this.isDocumentoDigital(item.examen_medico) },
        { nombre: 'Examen Toxicológico', descripcion: 'Control antidoping', entregado: this.isDocumentoDigital(item.examen_toxicologico) },
        { nombre: 'Carta de Antecedentes', descripcion: 'No penales', entregado: this.isDocumentoDigital(item.carta_antecedentes) }
      ],
      preparacion_cuip_status: item.preparacion_cuip_status || 0,
      cursoCuip: item.cursoCuip,
      autorizado: item.autorizado
    };
  }

  aplicarFiltro(): void {
    const busqueda = this.busquedaOrden?.trim().toLowerCase() || '';

    this.cuips = this.cuips2.filter(cuip => {
      const digitalCompleto = cuip.documentosDigitales?.every(d => d.entregado) ?? false;
      const cursoCompleto = cuip.cursoCuip === 'Completo' || cuip.cursoCuip === true;
      const cuipRecibida = cuip.folio_cuip === 1;
      const autorizado = cuip.preparacion_cuip_status === 1;
      const examenPendiente = cuip.examen_cuip_status === 0;
      const porRenovarCUIP = cuip.estadoCuip === 'Renovación de CUIP próxima';

      let cumpleFiltro = true;
      switch (this.filtroSeleccionado) {
        case 'documentosIncompletos': cumpleFiltro = !digitalCompleto; break;
        case 'documentosListos': cumpleFiltro = digitalCompleto; break;
        case 'autorizados': cumpleFiltro = autorizado; break;
        case 'cursoCompleto': cumpleFiltro = cursoCompleto; break;
        case 'cuipRecibida': cumpleFiltro = cuipRecibida; break;
        case 'examenPendiente': cumpleFiltro = examenPendiente; break;
        case 'porRenovarCUIP': cumpleFiltro = porRenovarCUIP; break;
        default: cumpleFiltro = true; break;
      }

      const cumplePlanta = !this.plantaSeleccionada || cuip.planta === this.plantaSeleccionada;
      const cumpleSucursal = !this.sucursalSeleccionada || cuip.sucursal === this.sucursalSeleccionada;
      const cumplePuesto = !this.puestoSeleccionado || cuip.puesto === this.puestoSeleccionado;
      const cumpleBusqueda = !busqueda || cuip.numerOrden?.toString().toLowerCase().includes(busqueda);

      return cumpleFiltro && cumplePlanta && cumpleSucursal && cumplePuesto && cumpleBusqueda;
    });
  }

  isDocumentoDigital(link: string | null | undefined): boolean {
    return !!link && /\.pdf$/i.test(link.trim());
  }

  toggleFlip(cuip: Cuip): void {
  cuip.flipped = !cuip.flipped;
  cuip.showDocsDigitales = cuip.flipped; 
}

  /** 🔹 NUEVO: cálculo de progreso según flujo de etapas */
  getProgresoEtapa(cuip: Cuip): { porcentaje: number, color: string } {
    let porcentaje = 0;
    let color = 'lightgray';

    const digitalCompleto = cuip.documentosDigitales?.every(d => d.entregado) ?? false;

    if (!digitalCompleto) {
      porcentaje = 20; color = 'rgb(220,53,69)'; // Rojo
    }
    if (digitalCompleto) {
      porcentaje = 40; color = 'rgb(255,165,0)'; // Naranja
    }
    if (cuip.preparacion_cuip_status === 1) {
      porcentaje = 60; color = 'rgb(255,255,0)'; // Amarillo
    }
    if (cuip.examen_cuip === 1) {
      porcentaje = 80; color = 'rgb(40,187,69)'; // Verde
    }
    if (cuip.folio_cuip === 1) {
      porcentaje = 100; color = 'rgb(0,123,255)'; // Azul
    }

    return { porcentaje, color };
  }

  getStrokeOffset(cuip: Cuip): number {
    const { porcentaje } = this.getProgresoEtapa(cuip);
    return this.circumference - (porcentaje / 100) * this.circumference;
  }

  getStrokeColor(cuip: Cuip): string {
    const { color } = this.getProgresoEtapa(cuip);
    return color;
  }

  getEtapaTexto(cuip: Cuip): string {
    const { porcentaje } = this.getProgresoEtapa(cuip);
    switch (porcentaje) {
      case 0: return 'Nada';
      case 20: return 'Documentos incompletos';
      case 40: return 'Expediente completo';
      case 60: return 'Autorizados';
      case 80: return 'Curso completo';
      case 100: return 'CUIP recibida';
      default: return '';
    }
  }

  getCompletion(cuip: Cuip): number {
  return this.getProgresoEtapa(cuip).porcentaje;
}

  hasAllRequiredDocuments(cuip: Cuip): boolean {
    const obligatorios = [
      'INE', 'Acta de Nacimiento', 'CURP', 'Carta de Antecedentes',
      'Examen Toxicológico', 'Examen Médico', 'Comprobante Domicilio'
    ];
    return obligatorios.every(nombreDoc => {
      const doc = cuip.documentosDigitales.find(d => d.nombre === nombreDoc);
      return doc?.entregado ?? false;
    });
  }

  marcarPreparacionCUIP(cuip: Cuip): void {
    const numerOrden = Number(cuip.numerOrden);
    if (isNaN(numerOrden)) {
      console.error('Número de orden inválido', cuip.numerOrden);
      return;
    }

    this.SharedService.actualizarPreparacionCUIP(numerOrden).subscribe({
      next: () => {
        cuip.preparacion_cuip_status = 1;
        Swal.fire({
          icon: 'success',
          title: '¡Listo!',
          text: `Preparación CUIP marcada para ${cuip.nombre}`,
          timer: 2000,
          showConfirmButton: false
        });
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al actualizar la base de datos',
        });
      }
    });
  }

  onImageError(event: Event): void {
    (event.target as HTMLImageElement).src = 'assets/images/avatar.jpeg';
  }
}
