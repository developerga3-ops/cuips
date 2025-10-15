import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import Swal from 'sweetalert2';

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

  filtroSeleccionado: string = 'todos';
  busquedaOrden: string = '';

  // 🔹 Nuevas propiedades para filtros adicionales
  plantas: string[] = [];
  sucursales: string[] = [];
  puestos: string[] = [];
  plantaSeleccionada: string = '';
  sucursalSeleccionada: string = '';
  puestoSeleccionado: string = '';

  constructor(private SharedService: SharedService) { }

  ngOnInit(): void {
    this.SharedService.GetDocumentos().subscribe((data: any[]) => {
      this.cuips2 = data.map((item: any) => this.crearTarjetaCuip(item));
      console.log('Datos crudos desde backend:', this.cuips2);

      // 🔹 Extraer listas únicas de planta, sucursal y puesto
      this.plantas = [...new Set(this.cuips2.map((c: any) => c.planta).filter(Boolean))];
      this.sucursales = [...new Set(this.cuips2.map((c: any) => c.sucursal).filter(Boolean))];
      this.puestos = [...new Set(this.cuips2.map((c: any) => c.puesto).filter(Boolean))];

      this.aplicarFiltro();
    });
  }

  crearTarjetaCuip(item: any): any {
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

      preparacion_cuip_status: item.preparacion_cuip_status || 0
    };
  }

  aplicarFiltro(): void {
    const hoy = new Date();
    const anioActual = hoy.getFullYear();

    this.cuips = this.cuips2.filter((cuip: any) => {
      const digitalCompleto = cuip.documentosDigitales.every((d: any) => d.entregado);
      const fisicosVigentes = cuip.estadoCuip === 'CUIP vigente';
      const fisicosVencidos = cuip.estadoCuip === 'CUIP vencida' || cuip.estadoCuip === 'Renovación de CUIP próxima';

      let cuipVigentePorExamen = false;
      if (cuip.fecha_examen_cuip) {
        const anioExamen = new Date(cuip.fecha_examen_cuip).getFullYear();
        cuipVigentePorExamen = anioExamen === anioActual;
      }

      // 🔹 Filtrar por tipo de filtro
      let cumpleFiltro = true;
      switch (this.filtroSeleccionado) {
        case 'vigentes': cumpleFiltro = digitalCompleto && fisicosVigentes; break;
        case 'vencidos': cumpleFiltro = digitalCompleto && fisicosVencidos; break;
        case 'renovacion': cumpleFiltro = cuip.estadoCuip === 'Renovación de CUIP próxima'; break;
        case 'primeraVez': cumpleFiltro = cuip.cuip_url == null; break;
        case 'examenListo': cumpleFiltro = cuip.examen_cuip_status === 0 || cuip.examen_cuip_status === 1; break;
        case 'cuipVigente': cumpleFiltro = cuipVigentePorExamen; break;
        case 'documentosListos': cumpleFiltro = digitalCompleto; break;
        case 'documentosIncompletos': cumpleFiltro = !digitalCompleto; break;
        case 'todos': default: cumpleFiltro = true; break;
      }

      // 🔹 Filtrar por planta, sucursal y puesto seleccionadas
      const cumplePlanta = !this.plantaSeleccionada || cuip.planta === this.plantaSeleccionada;
      const cumpleSucursal = !this.sucursalSeleccionada || cuip.sucursal === this.sucursalSeleccionada;
      const cumplePuesto = !this.puestoSeleccionado || cuip.puesto === this.puestoSeleccionado;

      return cumpleFiltro && cumplePlanta && cumpleSucursal && cumplePuesto;
    });

    // 🔹 Aplicar búsqueda si hay texto
    if (this.busquedaOrden.trim() !== '') {
      this.cuips = this.cuips.filter((cuip: any) =>
        cuip.numerOrden.toString().toLowerCase().includes(this.busquedaOrden.toLowerCase().trim())
      );
    }
  }

  isDocumentoDigital(link: string | null): boolean {
    return !!link && /\.pdf$/i.test(link.trim());
  }

  toggleFlip(cuip: any): void {
    cuip.flipped = !cuip.flipped;
  }

  getCompletion(cuip: any): number {
    const docs: any[] = cuip.documentosDigitales || [];
    const total = docs.length;
    const entregados = docs.filter((d: any) => d.entregado).length;
    return total > 0 ? (entregados / total) * 100 : 0;
  }

  getStrokeOffset(cuip: any): number {
    const percent = this.getCompletion(cuip);
    return this.circumference - (percent / 100) * this.circumference;
  }

  getStrokeColor(cuip: any): string {
    const percent = this.getCompletion(cuip);
    const r = percent < 50 ? 220 : Math.round(220 - (220 - 40) * ((percent - 50) / 50));
    const g = percent < 50 ? Math.round(53 + (187 - 53) * (percent / 50)) : Math.round(187 + (167 - 187) * ((percent - 50) / 50));
    return `rgb(${r},${g},69)`;
  }

  hasAllRequiredDocuments(cuip: any): boolean {
    const obligatorios = [
      'INE', 'Acta de Nacimiento', 'CURP', 'Carta de Antecedentes',
      'Examen Toxicológico', 'Examen Médico', 'Comprobante Domicilio'
    ];
    return obligatorios.every((nombreDoc: string) => {
      const doc = cuip.documentosDigitales.find((d: any) => d.nombre === nombreDoc);
      return doc && doc.entregado;
    });
  }

  marcarPreparacionCUIP(cuip: any): void {
    this.SharedService.actualizarPreparacionCUIP(cuip.numerOrden)
      .subscribe({
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

  onImageError(event: any): void {
    event.target.src = 'assets/images/avatar.jpeg';
  }
}
