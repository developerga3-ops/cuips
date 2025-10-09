import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Empleados } from 'src/app/models/empleados';
import { SharedService } from 'src/app/services/shared.service';
import Swal from 'sweetalert2';
import { ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-update-pdfs',
  templateUrl: './update-pdfs.component.html',
  styleUrls: ['./update-pdfs.component.css'],
})
export class UpdatePDFSComponent {

  photos: string[] = [];
  photos9: string[] = [];
  photos12: string[] = [];

  photoData1: string | undefined;
  cameraOpen1 = false;

  photoData2: string | undefined;
  cameraOpen2 = false;
  examDate2: string | null = null;

  photoData3: string | undefined;
  cameraOpen3 = false;

  photoData4: string | undefined;
  cameraOpen4 = false;

  photoData5: string | undefined;
  cameraOpen5 = false;

  photoData7: string | undefined;
  cameraOpen7 = false;

  photoData8: string | undefined;
  cameraOpen8 = false;

  photoData9: string | undefined;
  cameraOpen9 = false;

  photoData10: string | undefined;
  cameraOpen10 = false;

  photoData11: string | undefined;
  cameraOpen11 = false;

  photoData12: string | undefined;
  cameraOpen12 = false;
  examDate12: string | null = null;

  photoData13: string | undefined;
  cameraOpen13 = false;
  examDate13: string | null = null;

  photoData14: string | undefined;
  cameraOpen14 = false;
  examDate14: string | null = null;

  photoData15: string | undefined;
  cameraOpen15 = false;
  examDate15: string | null = null;

  photoData16: string | undefined;
  cameraOpen16 = false;
  examDate16: string | null = null;

  photoData17: string | undefined;
  cameraOpen17 = false;

  photoData18: string | undefined;
  cameraOpen18 = false;

  photoData19: string | undefined;
  cameraOpen19 = false;

  photoData20: string | undefined;
  cameraOpen20 = false;

  photoData21: string | undefined;
  cameraOpen21 = false;

  photoData22: string | undefined;
  cameraOpen22 = false;

  photoData23: string | undefined;
  cameraOpen23 = false;

  photoData24: string | undefined;
  cameraOpen24 = false;

  photoData: string | undefined;
  cameraOpen = false;

  isFrontCamera = false; // Esta variable rastreará la cámara activa
  isFrontCamera2 = false;
  isFrontCamera3 = false;
  isFrontCamera4 = false;
  isFrontCamera5 = false;
  isFrontCamera7 = false;
  isFrontCamera8 = false;
  isFrontCamera9 = false;
  isFrontCamera10 = false;
  isFrontCamera11 = false;
  isFrontCamera12 = false;
  isFrontCamera13 = false;
  isFrontCamera14 = false;
  isFrontCamera15 = false;
  isFrontCamera16 = false;
  isFrontCamera17 = false;
  isFrontCamera18 = false;
  isFrontCamera19 = false;
  isFrontCamera20 = false;
  isFrontCamera21 = false;
  isFrontCamera22 = false;
  isFrontCamera23 = false;
  isFrontCamera24 = false;

  videoStream: MediaStream | undefined;

  @ViewChild('videoElement') videoElement!: ElementRef;

  empleado!: Empleados;
  empleado_id_!: number;
  nombre: string = '';
  apellidoPaterno: string = '';
  apellidoMaterno: string = '';
  sucursal: string = '';
  cliente: string = '';
  selectedFile: File | undefined;
  opened: boolean = true;

  fecha!: Date;

  showAlert1: boolean = false;
  showAlert2: boolean = false;
  showAlert3: boolean = false;
  showAlert4: boolean = false;
  showAlert5: boolean = false;
  showAlert7: boolean = false;
  showAlert8: boolean = false;
  showAlert9: boolean = false;
  showAlert10: boolean = false;
  showAlert11: boolean = false;
  showAlert12: boolean = false;
  showAlert13: boolean = false;
  showAlert14: boolean = false;
  showAlert15: boolean = false;
  showAlert16: boolean = false;
  showAlert17: boolean = false;
  showAlert18: boolean = false;
  showAlert19: boolean = false;
  showAlert20: boolean = false;
  showAlert21: boolean = false;
  showAlert22: boolean = false;
  showAlert23: boolean = false;
  showAlert24: boolean = false;

  async openCamera() {
    this.cameraOpen1 = true;
    try {
      const constraints = {
        video: {
          facingMode: this.isFrontCamera ? 'user' : 'environment', // Cambiar entre 'user' y 'environment' para alternar cámaras
        },
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      const video: HTMLVideoElement = this.videoElement.nativeElement;
      video.srcObject = stream;
      this.videoStream = stream;

      // Ajusta el estilo de transformación para que no sea en modo espejo
      video.style.transform = this.isFrontCamera ? 'scaleX(-1)' : 'none';
    } catch (error) {
      console.error('Error al acceder a la cámara:', error);
    }
  }

  async toggleCamera() {
    // Cambiar entre las cámaras frontal y trasera
    this.isFrontCamera = !this.isFrontCamera;

    // Si la cámara está abierta, actualiza la configuración
    if (this.cameraOpen1) {
      const video: HTMLVideoElement = this.videoElement.nativeElement;
      const constraints = {
        video: {
          facingMode: this.isFrontCamera ? 'user' : 'environment',
        },
      };

      // Detén la transmisión de video actual
      if (this.videoStream) {
        this.videoStream.getTracks().forEach((track) => track.stop());
      }

      // Vuelve a abrir la cámara con la nueva configuración
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        video.srcObject = stream;
        this.videoStream = stream;

        // Ajusta el estilo de transformación para que no sea en modo espejo
        video.style.transform = this.isFrontCamera ? 'scaleX(-1)' : 'none';
      } catch (error) {
        console.error('Error al cambiar la cámara:', error);
      }
    }
  }

  async takePhoto() {
    const video: HTMLVideoElement = this.videoElement.nativeElement;

    // Captura una foto del video
    const photo = await this.capturePhoto(video);

    // Muestra la foto en la vista previa
    this.photoData1 = photo;

    // Detén la transmisión de video (apaga la cámara)
    if (this.videoStream) {
      this.videoStream.getTracks().forEach((track) => track.stop());
      this.cameraOpen1 = false;
    }
  }

  async capturePhoto(video: HTMLVideoElement): Promise<string> {
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext('2d');
    if (context) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const photoDataUrl = canvas.toDataURL('image/jpeg'); // Puedes cambiar el formato según tus necesidades

      return photoDataUrl;
    } else {
      throw new Error('No se pudo capturar la foto.');
    }
  }

  async openCamera2() {
    this.cameraOpen2 = true;
    try {
      const constraints = {
        video: {
          facingMode: this.isFrontCamera2 ? 'user' : 'environment', // Cambiar entre 'user' y 'environment' para alternar cámaras
        },
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      const video: HTMLVideoElement = this.videoElement.nativeElement;
      video.srcObject = stream;
      this.videoStream = stream;

      // Ajusta el estilo de transformación para que no sea en modo espejo
      video.style.transform = this.isFrontCamera2 ? 'scaleX(-1)' : 'none';
    } catch (error) {
      console.error('Error al acceder a la cámara:', error);
    }
  }

  async toggleCamera2() {
    // Cambiar entre las cámaras frontal y trasera
    this.isFrontCamera2 = !this.isFrontCamera2;

    // Si la cámara está abierta, actualiza la configuración
    if (this.cameraOpen2) {
      const video: HTMLVideoElement = this.videoElement.nativeElement;
      const constraints = {
        video: {
          facingMode: this.isFrontCamera2 ? 'user' : 'environment',
        },
      };

      // Detén la transmisión de video actual
      if (this.videoStream) {
        this.videoStream.getTracks().forEach((track) => track.stop());
      }

      // Vuelve a abrir la cámara con la nueva configuración
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        video.srcObject = stream;
        this.videoStream = stream;

        // Ajusta el estilo de transformación para que no sea en modo espejo
        video.style.transform = this.isFrontCamera2 ? 'scaleX(-1)' : 'none';
      } catch (error) {
        console.error('Error al cambiar la cámara:', error);
      }
    }
  }

  async takePhoto2() {
    const video: HTMLVideoElement = this.videoElement.nativeElement;

    // Captura una foto del video
    const photo = await this.capturePhoto2(video);

    // Muestra la foto en la vista previa
    this.photoData2 = photo;

    // Detén la transmisión de video (apaga la cámara)
    if (this.videoStream) {
      this.videoStream.getTracks().forEach((track) => track.stop());
      this.cameraOpen2 = false;
    }
  }

  async capturePhoto2(video: HTMLVideoElement): Promise<string> {
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext('2d');
    if (context) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const photoDataUrl = canvas.toDataURL('image/jpeg'); // Puedes cambiar el formato según tus necesidades

      return photoDataUrl;
    } else {
      throw new Error('No se pudo capturar la foto.');
    }
  }

  async openCamera3() {
    this.cameraOpen3 = true;
    try {
      const constraints = {
        video: {
          facingMode: this.isFrontCamera3 ? 'user' : 'environment', // Cambiar entre 'user' y 'environment' para alternar cámaras
        },
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      const video: HTMLVideoElement = this.videoElement.nativeElement;
      video.srcObject = stream;
      this.videoStream = stream;

      // Ajusta el estilo de transformación para que no sea en modo espejo
      video.style.transform = this.isFrontCamera3 ? 'scaleX(-1)' : 'none';
    } catch (error) {
      console.error('Error al acceder a la cámara:', error);
    }
  }

  async toggleCamera3() {
    // Cambiar entre las cámaras frontal y trasera
    this.isFrontCamera3 = !this.isFrontCamera3;

    // Si la cámara está abierta, actualiza la configuración
    if (this.cameraOpen3) {
      const video: HTMLVideoElement = this.videoElement.nativeElement;
      const constraints = {
        video: {
          facingMode: this.isFrontCamera3 ? 'user' : 'environment',
        },
      };

      // Detén la transmisión de video actual
      if (this.videoStream) {
        this.videoStream.getTracks().forEach((track) => track.stop());
      }

      // Vuelve a abrir la cámara con la nueva configuración
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        video.srcObject = stream;
        this.videoStream = stream;

        // Ajusta el estilo de transformación para que no sea en modo espejo
        video.style.transform = this.isFrontCamera3 ? 'scaleX(-1)' : 'none';
      } catch (error) {
        console.error('Error al cambiar la cámara:', error);
      }
    }
  }

  async takePhoto3() {
    const video: HTMLVideoElement = this.videoElement.nativeElement;

    // Captura una foto del video
    const photo = await this.capturePhoto3(video);

    // Muestra la foto en la vista previa
    this.photoData3 = photo;

    // Detén la transmisión de video (apaga la cámara)
    if (this.videoStream) {
      this.videoStream.getTracks().forEach((track) => track.stop());
      this.cameraOpen3 = false;
    }
  }

  async capturePhoto3(video: HTMLVideoElement): Promise<string> {
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext('2d');
    if (context) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const photoDataUrl = canvas.toDataURL('image/jpeg'); // Puedes cambiar el formato según tus necesidades

      return photoDataUrl;
    } else {
      throw new Error('No se pudo capturar la foto.');
    }
  }

  async openCamera4() {
    this.cameraOpen4 = true;
    try {
      const constraints = {
        video: {
          facingMode: this.isFrontCamera4 ? 'user' : 'environment', // Cambiar entre 'user' y 'environment' para alternar cámaras
        },
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      const video: HTMLVideoElement = this.videoElement.nativeElement;
      video.srcObject = stream;
      this.videoStream = stream;

      // Ajusta el estilo de transformación para que no sea en modo espejo
      video.style.transform = this.isFrontCamera4 ? 'scaleX(-1)' : 'none';
    } catch (error) {
      console.error('Error al acceder a la cámara:', error);
    }
  }

  async toggleCamera4() {
    // Cambiar entre las cámaras frontal y trasera
    this.isFrontCamera4 = !this.isFrontCamera4;

    // Si la cámara está abierta, actualiza la configuración
    if (this.cameraOpen4) {
      const video: HTMLVideoElement = this.videoElement.nativeElement;
      const constraints = {
        video: {
          facingMode: this.isFrontCamera4 ? 'user' : 'environment',
        },
      };

      // Detén la transmisión de video actual
      if (this.videoStream) {
        this.videoStream.getTracks().forEach((track) => track.stop());
      }

      // Vuelve a abrir la cámara con la nueva configuración
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        video.srcObject = stream;
        this.videoStream = stream;

        // Ajusta el estilo de transformación para que no sea en modo espejo
        video.style.transform = this.isFrontCamera4 ? 'scaleX(-1)' : 'none';
      } catch (error) {
        console.error('Error al cambiar la cámara:', error);
      }
    }
  }

  async takePhoto4() {
    const video: HTMLVideoElement = this.videoElement.nativeElement;

    // Captura una foto del video
    const photo = await this.capturePhoto4(video);

    // Muestra la foto en la vista previa
    this.photoData4 = photo;

    // Detén la transmisión de video (apaga la cámara)
    if (this.videoStream) {
      this.videoStream.getTracks().forEach((track) => track.stop());
      this.cameraOpen4 = false;
    }
  }

  async capturePhoto4(video: HTMLVideoElement): Promise<string> {
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext('2d');
    if (context) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const photoDataUrl = canvas.toDataURL('image/jpeg'); // Puedes cambiar el formato según tus necesidades

      return photoDataUrl;
    } else {
      throw new Error('No se pudo capturar la foto.');
    }
  }

  async openCamera5() {
    this.cameraOpen5 = true;
    try {
      const constraints = {
        video: {
          facingMode: this.isFrontCamera5 ? 'user' : 'environment', // Cambiar entre 'user' y 'environment' para alternar cámaras
        },
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      const video: HTMLVideoElement = this.videoElement.nativeElement;
      video.srcObject = stream;
      this.videoStream = stream;

      // Ajusta el estilo de transformación para que no sea en modo espejo
      video.style.transform = this.isFrontCamera5 ? 'scaleX(-1)' : 'none';
    } catch (error) {
      console.error('Error al acceder a la cámara:', error);
    }
  }

  async toggleCamera5() {
    // Cambiar entre las cámaras frontal y trasera
    this.isFrontCamera5 = !this.isFrontCamera5;

    // Si la cámara está abierta, actualiza la configuración
    if (this.cameraOpen5) {
      const video: HTMLVideoElement = this.videoElement.nativeElement;
      const constraints = {
        video: {
          facingMode: this.isFrontCamera5 ? 'user' : 'environment',
        },
      };

      // Detén la transmisión de video actual
      if (this.videoStream) {
        this.videoStream.getTracks().forEach((track) => track.stop());
      }

      // Vuelve a abrir la cámara con la nueva configuración
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        video.srcObject = stream;
        this.videoStream = stream;

        // Ajusta el estilo de transformación para que no sea en modo espejo
        video.style.transform = this.isFrontCamera5 ? 'scaleX(-1)' : 'none';
      } catch (error) {
        console.error('Error al cambiar la cámara:', error);
      }
    }
  }

  async takePhoto5() {
    const video: HTMLVideoElement = this.videoElement.nativeElement;

    // Captura una foto del video
    const photo = await this.capturePhoto5(video);

    // Muestra la foto en la vista previa
    this.photoData5 = photo;

    // Detén la transmisión de video (apaga la cámara)
    if (this.videoStream) {
      this.videoStream.getTracks().forEach((track) => track.stop());
      this.cameraOpen5 = false;
    }
  }

  async capturePhoto5(video: HTMLVideoElement): Promise<string> {
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext('2d');
    if (context) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const photoDataUrl = canvas.toDataURL('image/jpeg'); // Puedes cambiar el formato según tus necesidades

      return photoDataUrl;
    } else {
      throw new Error('No se pudo capturar la foto.');
    }
  }

  async openCamera7() {
    this.cameraOpen7 = true;
    try {
      const constraints = {
        video: {
          facingMode: this.isFrontCamera7 ? 'user' : 'environment',
        },
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      const video: HTMLVideoElement = this.videoElement.nativeElement;
      video.srcObject = stream;
      this.videoStream = stream;

      // Ajusta el estilo de transformación para que no sea en modo espejo
      video.style.transform = this.isFrontCamera7 ? 'scaleX(-1)' : 'none';
    } catch (error) {
      console.error('Error al acceder a la cámara:', error);
    }
  }

  async toggleCamera7() {
    // Cambiar entre las cámaras frontal y trasera
    this.isFrontCamera7 = !this.isFrontCamera7;

    // Si la cámara está abierta, actualiza la configuración
    if (this.cameraOpen7) {
      const video: HTMLVideoElement = this.videoElement.nativeElement;
      const constraints = {
        video: {
          facingMode: this.isFrontCamera7 ? 'user' : 'environment',
        },
      };

      // Detén la transmisión de video actual
      if (this.videoStream) {
        this.videoStream.getTracks().forEach((track) => track.stop());
      }

      // Vuelve a abrir la cámara con la nueva configuración
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        video.srcObject = stream;
        this.videoStream = stream;

        // Ajusta el estilo de transformación para que no sea en modo espejo
        video.style.transform = this.isFrontCamera7 ? 'scaleX(-1)' : 'none';
      } catch (error) {
        console.error('Error al cambiar la cámara:', error);
      }
    }
  }

  async takePhoto7() {
    const video: HTMLVideoElement = this.videoElement.nativeElement;

    // Captura una foto del video
    const photo = await this.capturePhoto7(video);

    // Almacena la foto en el array de fotos
    this.photos.push(photo);
  }

  async capturePhoto7(video: HTMLVideoElement): Promise<string> {
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext('2d');
    if (context) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const photoDataUrl = canvas.toDataURL('image/jpeg'); // Puedes cambiar el formato según tus necesidades

      return photoDataUrl;
    } else {
      throw new Error('No se pudo capturar la foto.');
    }
  }

  async openCamera8() {
    this.cameraOpen8 = true;
    try {
      const constraints = {
        video: {
          facingMode: this.isFrontCamera8 ? 'user' : 'environment', // Cambiar entre 'user' y 'environment' para alternar cámaras
        },
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      const video: HTMLVideoElement = this.videoElement.nativeElement;
      video.srcObject = stream;
      this.videoStream = stream;

      // Ajusta el estilo de transformación para que no sea en modo espejo
      video.style.transform = this.isFrontCamera8 ? 'scaleX(-1)' : 'none';
    } catch (error) {
      console.error('Error al acceder a la cámara:', error);
    }
  }

  async toggleCamera8() {
    // Cambiar entre las cámaras frontal y trasera
    this.isFrontCamera8 = !this.isFrontCamera8;

    // Si la cámara está abierta, actualiza la configuración
    if (this.cameraOpen8) {
      const video: HTMLVideoElement = this.videoElement.nativeElement;
      const constraints = {
        video: {
          facingMode: this.isFrontCamera8 ? 'user' : 'environment',
        },
      };

      // Detén la transmisión de video actual
      if (this.videoStream) {
        this.videoStream.getTracks().forEach((track) => track.stop());
      }

      // Vuelve a abrir la cámara con la nueva configuración
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        video.srcObject = stream;
        this.videoStream = stream;

        // Ajusta el estilo de transformación para que no sea en modo espejo
        video.style.transform = this.isFrontCamera8 ? 'scaleX(-1)' : 'none';
      } catch (error) {
        console.error('Error al cambiar la cámara:', error);
      }
    }
  }

  async takePhoto8() {
    const video: HTMLVideoElement = this.videoElement.nativeElement;

    // Captura una foto del video
    const photo = await this.capturePhoto8(video);

    // Muestra la foto en la vista previa
    this.photoData8 = photo;

    // Detén la transmisión de video (apaga la cámara)
    if (this.videoStream) {
      this.videoStream.getTracks().forEach((track) => track.stop());
      this.cameraOpen8 = false;
    }
  }

  async capturePhoto8(video: HTMLVideoElement): Promise<string> {
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext('2d');
    if (context) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const photoDataUrl = canvas.toDataURL('image/jpeg'); // Puedes cambiar el formato según tus necesidades

      return photoDataUrl;
    } else {
      throw new Error('No se pudo capturar la foto.');
    }
  }


  async openCamera9() {
    this.cameraOpen9 = true;
    try {
      const constraints = {
        video: {
          facingMode: this.isFrontCamera9 ? 'user' : 'environment',
        },
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      const video: HTMLVideoElement = this.videoElement.nativeElement;
      video.srcObject = stream;
      this.videoStream = stream;

      // Ajusta el estilo de transformación para que no sea en modo espejo
      video.style.transform = this.isFrontCamera9 ? 'scaleX(-1)' : 'none';
    } catch (error) {
      console.error('Error al acceder a la cámara:', error);
    }
  }

  async toggleCamera9() {
    // Cambiar entre las cámaras frontal y trasera
    this.isFrontCamera9 = !this.isFrontCamera9;

    // Si la cámara está abierta, actualiza la configuración
    if (this.cameraOpen9) {
      const video: HTMLVideoElement = this.videoElement.nativeElement;
      const constraints = {
        video: {
          facingMode: this.isFrontCamera9 ? 'user' : 'environment',
        },
      };

      // Detén la transmisión de video actual
      if (this.videoStream) {
        this.videoStream.getTracks().forEach((track) => track.stop());
      }

      // Vuelve a abrir la cámara con la nueva configuración
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        video.srcObject = stream;
        this.videoStream = stream;

        // Ajusta el estilo de transformación para que no sea en modo espejo
        video.style.transform = this.isFrontCamera9 ? 'scaleX(-1)' : 'none';
      } catch (error) {
        console.error('Error al cambiar la cámara:', error);
      }
    }
  }

  async takePhoto9() {
    const video: HTMLVideoElement = this.videoElement.nativeElement;

    // Captura una foto del video
    const photo = await this.capturePhoto9(video);

    // Almacena la foto en el array de fotos
    this.photos9.push(photo);
  }

  async capturePhoto9(video: HTMLVideoElement): Promise<string> {
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext('2d');
    if (context) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const photoDataUrl = canvas.toDataURL('image/jpeg'); // Puedes cambiar el formato según tus necesidades

      return photoDataUrl;
    } else {
      throw new Error('No se pudo capturar la foto.');
    }
  }

  async openCamera10() {
    this.cameraOpen10 = true;
    try {
      const constraints = {
        video: {
          facingMode: this.isFrontCamera10 ? 'user' : 'environment', // Cambiar entre 'user' y 'environment' para alternar cámaras
        },
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      const video: HTMLVideoElement = this.videoElement.nativeElement;
      video.srcObject = stream;
      this.videoStream = stream;

      // Ajusta el estilo de transformación para que no sea en modo espejo
      video.style.transform = this.isFrontCamera10 ? 'scaleX(-1)' : 'none';
    } catch (error) {
      console.error('Error al acceder a la cámara:', error);
    }
  }

  async toggleCamera10() {
    // Cambiar entre las cámaras frontal y trasera
    this.isFrontCamera10 = !this.isFrontCamera10;

    // Si la cámara está abierta, actualiza la configuración
    if (this.cameraOpen10) {
      const video: HTMLVideoElement = this.videoElement.nativeElement;
      const constraints = {
        video: {
          facingMode: this.isFrontCamera10 ? 'user' : 'environment',
        },
      };

      // Detén la transmisión de video actual
      if (this.videoStream) {
        this.videoStream.getTracks().forEach((track) => track.stop());
      }

      // Vuelve a abrir la cámara con la nueva configuración
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        video.srcObject = stream;
        this.videoStream = stream;

        // Ajusta el estilo de transformación para que no sea en modo espejo
        video.style.transform = this.isFrontCamera10 ? 'scaleX(-1)' : 'none';
      } catch (error) {
        console.error('Error al cambiar la cámara:', error);
      }
    }
  }

  async takePhoto10() {
    const video: HTMLVideoElement = this.videoElement.nativeElement;

    // Captura una foto del video
    const photo = await this.capturePhoto10(video);

    // Muestra la foto en la vista previa
    this.photoData10 = photo;

    // Detén la transmisión de video (apaga la cámara)
    if (this.videoStream) {
      this.videoStream.getTracks().forEach((track) => track.stop());
      this.cameraOpen10 = false;
    }
  }

  async capturePhoto10(video: HTMLVideoElement): Promise<string> {
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext('2d');
    if (context) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const photoDataUrl = canvas.toDataURL('image/jpeg'); // Puedes cambiar el formato según tus necesidades

      return photoDataUrl;
    } else {
      throw new Error('No se pudo capturar la foto.');
    }
  }

  async openCamera11() {
    this.cameraOpen11 = true;
    try {
      const constraints = {
        video: {
          facingMode: this.isFrontCamera11 ? 'user' : 'environment', // Cambiar entre 'user' y 'environment' para alternar cámaras
        },
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      const video: HTMLVideoElement = this.videoElement.nativeElement;
      video.srcObject = stream;
      this.videoStream = stream;

      // Ajusta el estilo de transformación para que no sea en modo espejo
      video.style.transform = this.isFrontCamera11 ? 'scaleX(-1)' : 'none';
    } catch (error) {
      console.error('Error al acceder a la cámara:', error);
    }
  }

  async toggleCamera11() {
    // Cambiar entre las cámaras frontal y trasera
    this.isFrontCamera11 = !this.isFrontCamera11;

    // Si la cámara está abierta, actualiza la configuración
    if (this.cameraOpen11) {
      const video: HTMLVideoElement = this.videoElement.nativeElement;
      const constraints = {
        video: {
          facingMode: this.isFrontCamera11 ? 'user' : 'environment',
        },
      };

      // Detén la transmisión de video actual
      if (this.videoStream) {
        this.videoStream.getTracks().forEach((track) => track.stop());
      }

      // Vuelve a abrir la cámara con la nueva configuración
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        video.srcObject = stream;
        this.videoStream = stream;

        // Ajusta el estilo de transformación para que no sea en modo espejo
        video.style.transform = this.isFrontCamera11 ? 'scaleX(-1)' : 'none';
      } catch (error) {
        console.error('Error al cambiar la cámara:', error);
      }
    }
  }

  async takePhoto11() {
    const video: HTMLVideoElement = this.videoElement.nativeElement;

    // Captura una foto del video
    const photo = await this.capturePhoto11(video);

    // Muestra la foto en la vista previa
    this.photoData11 = photo;

    // Detén la transmisión de video (apaga la cámara)
    if (this.videoStream) {
      this.videoStream.getTracks().forEach((track) => track.stop());
      this.cameraOpen11 = false;
    }
  }

  async capturePhoto11(video: HTMLVideoElement): Promise<string> {
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext('2d');
    if (context) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const photoDataUrl = canvas.toDataURL('image/jpeg'); // Puedes cambiar el formato según tus necesidades

      return photoDataUrl;
    } else {
      throw new Error('No se pudo capturar la foto.');
    }
  }

  async openCamera12() {
    this.cameraOpen12 = true;
    try {
      const constraints = {
        video: {
          facingMode: this.isFrontCamera12 ? 'user' : 'environment', // Cambiar entre 'user' y 'environment' para alternar cámaras
        },
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      const video: HTMLVideoElement = this.videoElement.nativeElement;
      video.srcObject = stream;
      this.videoStream = stream;

      // Ajusta el estilo de transformación para que no sea en modo espejo
      video.style.transform = this.isFrontCamera12 ? 'scaleX(-1)' : 'none';
    } catch (error) {
      console.error('Error al acceder a la cámara:', error);
    }
  }

  async toggleCamera12() {
    // Cambiar entre las cámaras frontal y trasera
    this.isFrontCamera12 = !this.isFrontCamera12;

    // Si la cámara está abierta, actualiza la configuración
    if (this.cameraOpen12) {
      const video: HTMLVideoElement = this.videoElement.nativeElement;
      const constraints = {
        video: {
          facingMode: this.isFrontCamera12 ? 'user' : 'environment',
        },
      };

      // Detén la transmisión de video actual
      if (this.videoStream) {
        this.videoStream.getTracks().forEach((track) => track.stop());
      }

      // Vuelve a abrir la cámara con la nueva configuración
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        video.srcObject = stream;
        this.videoStream = stream;

        // Ajusta el estilo de transformación para que no sea en modo espejo
        video.style.transform = this.isFrontCamera12 ? 'scaleX(-1)' : 'none';
      } catch (error) {
        console.error('Error al cambiar la cámara:', error);
      }
    }
  }

  async takePhoto12() {
    const video: HTMLVideoElement = this.videoElement.nativeElement;

    // Captura una foto del video
    const photo = await this.capturePhoto12(video);

    // Añade la foto al arreglo de fotos
    this.photos12.push(photo);
  }


  async capturePhoto12(video: HTMLVideoElement): Promise<string> {
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext('2d');
    if (context) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const photoDataUrl = canvas.toDataURL('image/jpeg'); // Puedes cambiar el formato según tus necesidades

      return photoDataUrl;
    } else {
      throw new Error('No se pudo capturar la foto.');
    }
  }

  onDateChange12(e: Event) {
    console.log('fecha:', this.examDate12);
  }

  async openCamera13() {
    this.cameraOpen13 = true;
    try {
      const constraints = {
        video: {
          facingMode: this.isFrontCamera13 ? 'user' : 'environment', // Cambiar entre 'user' y 'environment' para alternar cámaras
        },
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      const video: HTMLVideoElement = this.videoElement.nativeElement;
      video.srcObject = stream;
      this.videoStream = stream;

      // Ajusta el estilo de transformación para que no sea en modo espejo
      video.style.transform = this.isFrontCamera13 ? 'scaleX(-1)' : 'none';
    } catch (error) {
      console.error('Error al acceder a la cámara:', error);
    }
  }

  async toggleCamera13() {
    // Cambiar entre las cámaras frontal y trasera
    this.isFrontCamera12 = !this.isFrontCamera13;

    // Si la cámara está abierta, actualiza la configuración
    if (this.cameraOpen13) {
      const video: HTMLVideoElement = this.videoElement.nativeElement;
      const constraints = {
        video: {
          facingMode: this.isFrontCamera13 ? 'user' : 'environment',
        },
      };

      // Detén la transmisión de video actual
      if (this.videoStream) {
        this.videoStream.getTracks().forEach((track) => track.stop());
      }

      // Vuelve a abrir la cámara con la nueva configuración
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        video.srcObject = stream;
        this.videoStream = stream;

        // Ajusta el estilo de transformación para que no sea en modo espejo
        video.style.transform = this.isFrontCamera13 ? 'scaleX(-1)' : 'none';
      } catch (error) {
        console.error('Error al cambiar la cámara:', error);
      }
    }
  }

  async takePhoto13() {
    const video: HTMLVideoElement = this.videoElement.nativeElement;

    // Captura una foto del video
    const photo = await this.capturePhoto13(video);

    // Muestra la foto en la vista previa
    this.photoData13 = photo;

    // Detén la transmisión de video (apaga la cámara)
    if (this.videoStream) {
      this.videoStream.getTracks().forEach((track) => track.stop());
      this.cameraOpen13 = false;
    }
  }

  async capturePhoto13(video: HTMLVideoElement): Promise<string> {
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext('2d');
    if (context) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const photoDataUrl = canvas.toDataURL('image/jpeg'); // Puedes cambiar el formato según tus necesidades

      return photoDataUrl;
    } else {
      throw new Error('No se pudo capturar la foto.');
    }
  }

  async openCamera14() {
    this.cameraOpen14 = true;
    try {
      const constraints = {
        video: {
          facingMode: this.isFrontCamera14 ? 'user' : 'environment', // Cambiar entre 'user' y 'environment' para alternar cámaras
        },
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      const video: HTMLVideoElement = this.videoElement.nativeElement;
      video.srcObject = stream;
      this.videoStream = stream;

      // Ajusta el estilo de transformación para que no sea en modo espejo
      video.style.transform = this.isFrontCamera14 ? 'scaleX(-1)' : 'none';
    } catch (error) {
      console.error('Error al acceder a la cámara:', error);
    }
  }

  async toggleCamera14() {
    // Cambiar entre las cámaras frontal y trasera
    this.isFrontCamera14 = !this.isFrontCamera14;

    // Si la cámara está abierta, actualiza la configuración
    if (this.cameraOpen14) {
      const video: HTMLVideoElement = this.videoElement.nativeElement;
      const constraints = {
        video: {
          facingMode: this.isFrontCamera14 ? 'user' : 'environment',
        },
      };

      // Detén la transmisión de video actual
      if (this.videoStream) {
        this.videoStream.getTracks().forEach((track) => track.stop());
      }

      // Vuelve a abrir la cámara con la nueva configuración
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        video.srcObject = stream;
        this.videoStream = stream;

        // Ajusta el estilo de transformación para que no sea en modo espejo
        video.style.transform = this.isFrontCamera14 ? 'scaleX(-1)' : 'none';
      } catch (error) {
        console.error('Error al cambiar la cámara:', error);
      }
    }
  }

  async takePhoto14() {
    const video: HTMLVideoElement = this.videoElement.nativeElement;

    // Captura una foto del video
    const photo = await this.capturePhoto14(video);

    // Muestra la foto en la vista previa
    this.photoData14 = photo;

    // Detén la transmisión de video (apaga la cámara)
    if (this.videoStream) {
      this.videoStream.getTracks().forEach((track) => track.stop());
      this.cameraOpen14 = false;
    }
  }

  async capturePhoto14(video: HTMLVideoElement): Promise<string> {
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext('2d');
    if (context) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const photoDataUrl = canvas.toDataURL('image/jpeg'); // Puedes cambiar el formato según tus necesidades

      return photoDataUrl;
    } else {
      throw new Error('No se pudo capturar la foto.');
    }
  }

  async openCamera15() {
    this.cameraOpen15 = true;
    try {
      const constraints = {
        video: {
          facingMode: this.isFrontCamera15 ? 'user' : 'environment', // Cambiar entre 'user' y 'environment' para alternar cámaras
        },
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      const video: HTMLVideoElement = this.videoElement.nativeElement;
      video.srcObject = stream;
      this.videoStream = stream;

      // Ajusta el estilo de transformación para que no sea en modo espejo
      video.style.transform = this.isFrontCamera15 ? 'scaleX(-1)' : 'none';
    } catch (error) {
      console.error('Error al acceder a la cámara:', error);
    }
  }

  async toggleCamera15() {
    // Cambiar entre las cámaras frontal y trasera
    this.isFrontCamera15 = !this.isFrontCamera15;

    // Si la cámara está abierta, actualiza la configuración
    if (this.cameraOpen15) {
      const video: HTMLVideoElement = this.videoElement.nativeElement;
      const constraints = {
        video: {
          facingMode: this.isFrontCamera15 ? 'user' : 'environment',
        },
      };

      // Detén la transmisión de video actual
      if (this.videoStream) {
        this.videoStream.getTracks().forEach((track) => track.stop());
      }

      // Vuelve a abrir la cámara con la nueva configuración
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        video.srcObject = stream;
        this.videoStream = stream;

        // Ajusta el estilo de transformación para que no sea en modo espejo
        video.style.transform = this.isFrontCamera15 ? 'scaleX(-1)' : 'none';
      } catch (error) {
        console.error('Error al cambiar la cámara:', error);
      }
    }
  }

  async takePhoto15() {
    const video: HTMLVideoElement = this.videoElement.nativeElement;

    // Captura una foto del video
    const photo = await this.capturePhoto12(video);

    // Muestra la foto en la vista previa
    this.photoData15 = photo;

    // Detén la transmisión de video (apaga la cámara)
    if (this.videoStream) {
      this.videoStream.getTracks().forEach((track) => track.stop());
      this.cameraOpen15 = false;
    }
  }

  async capturePhoto15(video: HTMLVideoElement): Promise<string> {
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext('2d');
    if (context) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const photoDataUrl = canvas.toDataURL('image/jpeg'); // Puedes cambiar el formato según tus necesidades

      return photoDataUrl;
    } else {
      throw new Error('No se pudo capturar la foto.');
    }
  }

  async openCamera16() {
    this.cameraOpen16 = true;
    try {
      const constraints = {
        video: {
          facingMode: this.isFrontCamera16 ? 'user' : 'environment', // Cambiar entre 'user' y 'environment' para alternar cámaras
        },
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      const video: HTMLVideoElement = this.videoElement.nativeElement;
      video.srcObject = stream;
      this.videoStream = stream;

      // Ajusta el estilo de transformación para que no sea en modo espejo
      video.style.transform = this.isFrontCamera16 ? 'scaleX(-1)' : 'none';
    } catch (error) {
      console.error('Error al acceder a la cámara:', error);
    }
  }

  async toggleCamera16() {
    // Cambiar entre las cámaras frontal y trasera
    this.isFrontCamera16 = !this.isFrontCamera16;

    // Si la cámara está abierta, actualiza la configuración
    if (this.cameraOpen16) {
      const video: HTMLVideoElement = this.videoElement.nativeElement;
      const constraints = {
        video: {
          facingMode: this.isFrontCamera16 ? 'user' : 'environment',
        },
      };

      // Detén la transmisión de video actual
      if (this.videoStream) {
        this.videoStream.getTracks().forEach((track) => track.stop());
      }

      // Vuelve a abrir la cámara con la nueva configuración
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        video.srcObject = stream;
        this.videoStream = stream;

        // Ajusta el estilo de transformación para que no sea en modo espejo
        video.style.transform = this.isFrontCamera16 ? 'scaleX(-1)' : 'none';
      } catch (error) {
        console.error('Error al cambiar la cámara:', error);
      }
    }
  }

  async takePhoto16() {
    const video: HTMLVideoElement = this.videoElement.nativeElement;

    // Captura una foto del video
    const photo = await this.capturePhoto16(video);

    // Muestra la foto en la vista previa
    this.photoData16 = photo;

    // Detén la transmisión de video (apaga la cámara)
    if (this.videoStream) {
      this.videoStream.getTracks().forEach((track) => track.stop());
      this.cameraOpen16 = false;
    }
  }

  async capturePhoto16(video: HTMLVideoElement): Promise<string> {
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext('2d');
    if (context) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const photoDataUrl = canvas.toDataURL('image/jpeg'); // Puedes cambiar el formato según tus necesidades

      return photoDataUrl;
    } else {
      throw new Error('No se pudo capturar la foto.');
    }
  }

  async openCamera17() {
    this.cameraOpen17 = true;
    try {
      const constraints = {
        video: {
          facingMode: this.isFrontCamera17 ? 'user' : 'environment', // Cambiar entre 'user' y 'environment' para alternar cámaras
        },
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      const video: HTMLVideoElement = this.videoElement.nativeElement;
      video.srcObject = stream;
      this.videoStream = stream;

      // Ajusta el estilo de transformación para que no sea en modo espejo
      video.style.transform = this.isFrontCamera17 ? 'scaleX(-1)' : 'none';
    } catch (error) {
      console.error('Error al acceder a la cámara:', error);
    }
  }

  async toggleCamera17() {
    // Cambiar entre las cámaras frontal y trasera
    this.isFrontCamera17 = !this.isFrontCamera17;

    // Si la cámara está abierta, actualiza la configuración
    if (this.cameraOpen17) {
      const video: HTMLVideoElement = this.videoElement.nativeElement;
      const constraints = {
        video: {
          facingMode: this.isFrontCamera17 ? 'user' : 'environment',
        },
      };

      // Detén la transmisión de video actual
      if (this.videoStream) {
        this.videoStream.getTracks().forEach((track) => track.stop());
      }

      // Vuelve a abrir la cámara con la nueva configuración
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        video.srcObject = stream;
        this.videoStream = stream;

        // Ajusta el estilo de transformación para que no sea en modo espejo
        video.style.transform = this.isFrontCamera17 ? 'scaleX(-1)' : 'none';
      } catch (error) {
        console.error('Error al cambiar la cámara:', error);
      }
    }
  }

  async takePhoto17() {
    const video: HTMLVideoElement = this.videoElement.nativeElement;

    // Captura una foto del video
    const photo = await this.capturePhoto17(video);

    // Muestra la foto en la vista previa
    this.photoData17 = photo;

    // Detén la transmisión de video (apaga la cámara)
    if (this.videoStream) {
      this.videoStream.getTracks().forEach((track) => track.stop());
      this.cameraOpen17 = false;
    }
  }

  async capturePhoto17(video: HTMLVideoElement): Promise<string> {
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext('2d');
    if (context) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const photoDataUrl = canvas.toDataURL('image/jpeg'); // Puedes cambiar el formato según tus necesidades

      return photoDataUrl;
    } else {
      throw new Error('No se pudo capturar la foto.');
    }
  }

  async openCamera18() {
    this.cameraOpen18 = true;
    try {
      const constraints = {
        video: {
          facingMode: this.isFrontCamera18 ? 'user' : 'environment', // Cambiar entre 'user' y 'environment' para alternar cámaras
        },
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      const video: HTMLVideoElement = this.videoElement.nativeElement;
      video.srcObject = stream;
      this.videoStream = stream;

      // Ajusta el estilo de transformación para que no sea en modo espejo
      video.style.transform = this.isFrontCamera18 ? 'scaleX(-1)' : 'none';
    } catch (error) {
      console.error('Error al acceder a la cámara:', error);
    }
  }

  async toggleCamera18() {
    // Cambiar entre las cámaras frontal y trasera
    this.isFrontCamera18 = !this.isFrontCamera18;

    // Si la cámara está abierta, actualiza la configuración
    if (this.cameraOpen18) {
      const video: HTMLVideoElement = this.videoElement.nativeElement;
      const constraints = {
        video: {
          facingMode: this.isFrontCamera18 ? 'user' : 'environment',
        },
      };

      // Detén la transmisión de video actual
      if (this.videoStream) {
        this.videoStream.getTracks().forEach((track) => track.stop());
      }

      // Vuelve a abrir la cámara con la nueva configuración
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        video.srcObject = stream;
        this.videoStream = stream;

        // Ajusta el estilo de transformación para que no sea en modo espejo
        video.style.transform = this.isFrontCamera18 ? 'scaleX(-1)' : 'none';
      } catch (error) {
        console.error('Error al cambiar la cámara:', error);
      }
    }
  }

  async takePhoto18() {
    const video: HTMLVideoElement = this.videoElement.nativeElement;

    // Captura una foto del video
    const photo = await this.capturePhoto18(video);

    // Muestra la foto en la vista previa
    this.photoData18 = photo;

    // Detén la transmisión de video (apaga la cámara)
    if (this.videoStream) {
      this.videoStream.getTracks().forEach((track) => track.stop());
      this.cameraOpen18 = false;
    }
  }

  async capturePhoto18(video: HTMLVideoElement): Promise<string> {
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext('2d');
    if (context) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const photoDataUrl = canvas.toDataURL('image/jpeg'); // Puedes cambiar el formato según tus necesidades

      return photoDataUrl;
    } else {
      throw new Error('No se pudo capturar la foto.');
    }
  }

  async openCamera19() {
    this.cameraOpen19 = true;
    try {
      const constraints = {
        video: {
          facingMode: this.isFrontCamera19 ? 'user' : 'environment', // Cambiar entre 'user' y 'environment' para alternar cámaras
        },
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      const video: HTMLVideoElement = this.videoElement.nativeElement;
      video.srcObject = stream;
      this.videoStream = stream;

      // Ajusta el estilo de transformación para que no sea en modo espejo
      video.style.transform = this.isFrontCamera19 ? 'scaleX(-1)' : 'none';
    } catch (error) {
      console.error('Error al acceder a la cámara:', error);
    }
  }

  async toggleCamera19() {
    // Cambiar entre las cámaras frontal y trasera
    this.isFrontCamera19 = !this.isFrontCamera19;

    // Si la cámara está abierta, actualiza la configuración
    if (this.cameraOpen19) {
      const video: HTMLVideoElement = this.videoElement.nativeElement;
      const constraints = {
        video: {
          facingMode: this.isFrontCamera19 ? 'user' : 'environment',
        },
      };

      // Detén la transmisión de video actual
      if (this.videoStream) {
        this.videoStream.getTracks().forEach((track) => track.stop());
      }

      // Vuelve a abrir la cámara con la nueva configuración
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        video.srcObject = stream;
        this.videoStream = stream;

        // Ajusta el estilo de transformación para que no sea en modo espejo
        video.style.transform = this.isFrontCamera19 ? 'scaleX(-1)' : 'none';
      } catch (error) {
        console.error('Error al cambiar la cámara:', error);
      }
    }
  }

  async takePhoto19() {
    const video: HTMLVideoElement = this.videoElement.nativeElement;

    // Captura una foto del video
    const photo = await this.capturePhoto19(video);

    // Muestra la foto en la vista previa
    this.photoData19 = photo;

    // Detén la transmisión de video (apaga la cámara)
    if (this.videoStream) {
      this.videoStream.getTracks().forEach((track) => track.stop());
      this.cameraOpen19 = false;
    }
  }

  async capturePhoto19(video: HTMLVideoElement): Promise<string> {
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext('2d');
    if (context) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const photoDataUrl = canvas.toDataURL('image/jpeg'); // Puedes cambiar el formato según tus necesidades

      return photoDataUrl;
    } else {
      throw new Error('No se pudo capturar la foto.');
    }
  }

  async openCamera20() {
    this.cameraOpen20 = true;
    try {
      const constraints = {
        video: {
          facingMode: this.isFrontCamera20 ? 'user' : 'environment', // Cambiar entre 'user' y 'environment' para alternar cámaras
        },
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      const video: HTMLVideoElement = this.videoElement.nativeElement;
      video.srcObject = stream;
      this.videoStream = stream;

      // Ajusta el estilo de transformación para que no sea en modo espejo
      video.style.transform = this.isFrontCamera20 ? 'scaleX(-1)' : 'none';
    } catch (error) {
      console.error('Error al acceder a la cámara:', error);
    }
  }

  async toggleCamera20() {
    // Cambiar entre las cámaras frontal y trasera
    this.isFrontCamera20 = !this.isFrontCamera20;

    // Si la cámara está abierta, actualiza la configuración
    if (this.cameraOpen20) {
      const video: HTMLVideoElement = this.videoElement.nativeElement;
      const constraints = {
        video: {
          facingMode: this.isFrontCamera20 ? 'user' : 'environment',
        },
      };

      // Detén la transmisión de video actual
      if (this.videoStream) {
        this.videoStream.getTracks().forEach((track) => track.stop());
      }

      // Vuelve a abrir la cámara con la nueva configuración
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        video.srcObject = stream;
        this.videoStream = stream;

        // Ajusta el estilo de transformación para que no sea en modo espejo
        video.style.transform = this.isFrontCamera20 ? 'scaleX(-1)' : 'none';
      } catch (error) {
        console.error('Error al cambiar la cámara:', error);
      }
    }
  }

  async takePhoto20() {
    const video: HTMLVideoElement = this.videoElement.nativeElement;

    // Captura una foto del video
    const photo = await this.capturePhoto20(video);

    // Muestra la foto en la vista previa
    this.photoData20 = photo;

    // Detén la transmisión de video (apaga la cámara)
    if (this.videoStream) {
      this.videoStream.getTracks().forEach((track) => track.stop());
      this.cameraOpen20 = false;
    }
  }

  async capturePhoto20(video: HTMLVideoElement): Promise<string> {
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext('2d');
    if (context) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const photoDataUrl = canvas.toDataURL('image/jpeg'); // Puedes cambiar el formato según tus necesidades

      return photoDataUrl;
    } else {
      throw new Error('No se pudo capturar la foto.');
    }
  }

  async openCamera21() {
    this.cameraOpen21 = true;
    try {
      const constraints = {
        video: {
          facingMode: this.isFrontCamera21 ? 'user' : 'environment', // Cambiar entre 'user' y 'environment' para alternar cámaras
        },
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      const video: HTMLVideoElement = this.videoElement.nativeElement;
      video.srcObject = stream;
      this.videoStream = stream;

      // Ajusta el estilo de transformación para que no sea en modo espejo
      video.style.transform = this.isFrontCamera21 ? 'scaleX(-1)' : 'none';
    } catch (error) {
      console.error('Error al acceder a la cámara:', error);
    }
  }

  async toggleCamera21() {
    // Cambiar entre las cámaras frontal y trasera
    this.isFrontCamera21 = !this.isFrontCamera21;

    // Si la cámara está abierta, actualiza la configuración
    if (this.cameraOpen21) {
      const video: HTMLVideoElement = this.videoElement.nativeElement;
      const constraints = {
        video: {
          facingMode: this.isFrontCamera21 ? 'user' : 'environment',
        },
      };

      // Detén la transmisión de video actual
      if (this.videoStream) {
        this.videoStream.getTracks().forEach((track) => track.stop());
      }

      // Vuelve a abrir la cámara con la nueva configuración
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        video.srcObject = stream;
        this.videoStream = stream;

        // Ajusta el estilo de transformación para que no sea en modo espejo
        video.style.transform = this.isFrontCamera21 ? 'scaleX(-1)' : 'none';
      } catch (error) {
        console.error('Error al cambiar la cámara:', error);
      }
    }
  }

  async takePhoto21() {
    const video: HTMLVideoElement = this.videoElement.nativeElement;

    // Captura una foto del video
    const photo = await this.capturePhoto21(video);

    // Muestra la foto en la vista previa
    this.photoData21 = photo;

    // Detén la transmisión de video (apaga la cámara)
    if (this.videoStream) {
      this.videoStream.getTracks().forEach((track) => track.stop());
      this.cameraOpen21 = false;
    }
  }

  async capturePhoto21(video: HTMLVideoElement): Promise<string> {
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext('2d');
    if (context) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const photoDataUrl = canvas.toDataURL('image/jpeg'); // Puedes cambiar el formato según tus necesidades

      return photoDataUrl;
    } else {
      throw new Error('No se pudo capturar la foto.');
    }
  }

  async openCamera22() {
    this.cameraOpen22 = true;
    try {
      const constraints = {
        video: {
          facingMode: this.isFrontCamera22 ? 'user' : 'environment', // Cambiar entre 'user' y 'environment' para alternar cámaras
        },
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      const video: HTMLVideoElement = this.videoElement.nativeElement;
      video.srcObject = stream;
      this.videoStream = stream;

      // Ajusta el estilo de transformación para que no sea en modo espejo
      video.style.transform = this.isFrontCamera22 ? 'scaleX(-1)' : 'none';
    } catch (error) {
      console.error('Error al acceder a la cámara:', error);
    }
  }

  async toggleCamera22() {
    // Cambiar entre las cámaras frontal y trasera
    this.isFrontCamera22 = !this.isFrontCamera22;

    // Si la cámara está abierta, actualiza la configuración
    if (this.cameraOpen22) {
      const video: HTMLVideoElement = this.videoElement.nativeElement;
      const constraints = {
        video: {
          facingMode: this.isFrontCamera22 ? 'user' : 'environment',
        },
      };

      // Detén la transmisión de video actual
      if (this.videoStream) {
        this.videoStream.getTracks().forEach((track) => track.stop());
      }

      // Vuelve a abrir la cámara con la nueva configuración
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        video.srcObject = stream;
        this.videoStream = stream;

        // Ajusta el estilo de transformación para que no sea en modo espejo
        video.style.transform = this.isFrontCamera22 ? 'scaleX(-1)' : 'none';
      } catch (error) {
        console.error('Error al cambiar la cámara:', error);
      }
    }
  }

  async takePhoto22() {
    const video: HTMLVideoElement = this.videoElement.nativeElement;

    // Captura una foto del video
    const photo = await this.capturePhoto22(video);

    // Muestra la foto en la vista previa
    this.photoData22 = photo;

    // Detén la transmisión de video (apaga la cámara)
    if (this.videoStream) {
      this.videoStream.getTracks().forEach((track) => track.stop());
      this.cameraOpen22 = false;
    }
  }

  async capturePhoto22(video: HTMLVideoElement): Promise<string> {
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext('2d');
    if (context) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const photoDataUrl = canvas.toDataURL('image/jpeg'); // Puedes cambiar el formato según tus necesidades

      return photoDataUrl;
    } else {
      throw new Error('No se pudo capturar la foto.');
    }
  }

  async openCamera23() {
    this.cameraOpen23 = true;
    try {
      const constraints = {
        video: {
          facingMode: this.isFrontCamera23 ? 'user' : 'environment', // Cambiar entre 'user' y 'environment' para alternar cámaras
        },
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      const video: HTMLVideoElement = this.videoElement.nativeElement;
      video.srcObject = stream;
      this.videoStream = stream;

      // Ajusta el estilo de transformación para que no sea en modo espejo
      video.style.transform = this.isFrontCamera3 ? 'scaleX(-1)' : 'none';
    } catch (error) {
      console.error('Error al acceder a la cámara:', error);
    }
  }

  async toggleCamera23() {
    // Cambiar entre las cámaras frontal y trasera
    this.isFrontCamera23 = !this.isFrontCamera23;

    // Si la cámara está abierta, actualiza la configuración
    if (this.cameraOpen23) {
      const video: HTMLVideoElement = this.videoElement.nativeElement;
      const constraints = {
        video: {
          facingMode: this.isFrontCamera23 ? 'user' : 'environment',
        },
      };

      // Detén la transmisión de video actual
      if (this.videoStream) {
        this.videoStream.getTracks().forEach((track) => track.stop());
      }

      // Vuelve a abrir la cámara con la nueva configuración
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        video.srcObject = stream;
        this.videoStream = stream;

        // Ajusta el estilo de transformación para que no sea en modo espejo
        video.style.transform = this.isFrontCamera23 ? 'scaleX(-1)' : 'none';
      } catch (error) {
        console.error('Error al cambiar la cámara:', error);
      }
    }
  }

  async takePhoto23() {
    const video: HTMLVideoElement = this.videoElement.nativeElement;

    // Captura una foto del video
    const photo = await this.capturePhoto3(video);

    // Muestra la foto en la vista previa
    this.photoData23 = photo;

    // Detén la transmisión de video (apaga la cámara)
    if (this.videoStream) {
      this.videoStream.getTracks().forEach((track) => track.stop());
      this.cameraOpen23 = false;
    }
  }

  async capturePhoto23(video: HTMLVideoElement): Promise<string> {
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext('2d');
    if (context) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const photoDataUrl = canvas.toDataURL('image/jpeg'); // Puedes cambiar el formato según tus necesidades

      return photoDataUrl;
    } else {
      throw new Error('No se pudo capturar la foto.');
    }
  }

  async openCamera24() {
    this.cameraOpen24 = true;
    try {
      const constraints = {
        video: {
          facingMode: this.isFrontCamera23 ? 'user' : 'environment', // Cambiar entre 'user' y 'environment' para alternar cámaras
        },
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      const video: HTMLVideoElement = this.videoElement.nativeElement;
      video.srcObject = stream;
      this.videoStream = stream;

      // Ajusta el estilo de transformación para que no sea en modo espejo
      video.style.transform = this.isFrontCamera3 ? 'scaleX(-1)' : 'none';
    } catch (error) {
      console.error('Error al acceder a la cámara:', error);
    }
  }

  async toggleCamera24() {
    // Cambiar entre las cámaras frontal y trasera
    this.isFrontCamera24 = !this.isFrontCamera24;

    // Si la cámara está abierta, actualiza la configuración
    if (this.cameraOpen24) {
      const video: HTMLVideoElement = this.videoElement.nativeElement;
      const constraints = {
        video: {
          facingMode: this.isFrontCamera24 ? 'user' : 'environment',
        },
      };

      // Detén la transmisión de video actual
      if (this.videoStream) {
        this.videoStream.getTracks().forEach((track) => track.stop());
      }

      // Vuelve a abrir la cámara con la nueva configuración
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        video.srcObject = stream;
        this.videoStream = stream;

        // Ajusta el estilo de transformación para que no sea en modo espejo
        video.style.transform = this.isFrontCamera24 ? 'scaleX(-1)' : 'none';
      } catch (error) {
        console.error('Error al cambiar la cámara:', error);
      }
    }
  }

  async takePhoto24() {
    const video: HTMLVideoElement = this.videoElement.nativeElement;

    // Captura una foto del video
    const photo = await this.capturePhoto3(video);

    // Muestra la foto en la vista previa
    this.photoData24 = photo;

    // Detén la transmisión de video (apaga la cámara)
    if (this.videoStream) {
      this.videoStream.getTracks().forEach((track) => track.stop());
      this.cameraOpen24 = false;
    }
  }

  async capturePhoto24(video: HTMLVideoElement): Promise<string> {
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext('2d');
    if (context) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const photoDataUrl = canvas.toDataURL('image/jpeg'); // Puedes cambiar el formato según tus necesidades

      return photoDataUrl;
    } else {
      throw new Error('No se pudo capturar la foto.');
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  constructor(private servicios: SharedService, private http: HttpClient) {
    this.fecha = new Date();
  }

  salir() {
    // Recargar la página
    window.scrollTo(0, 0);

    setTimeout(() => {
      window.location.reload();
    }, 500);
  }

  FindEmployee() {
    if (!this.empleado_id_) {
      Swal.fire(
        'UPS...',
        'NO SE HA INTRODUCIDO NINGUN NUMERO DE ORDEN',
        'error'
      );
      return;
    } else {
      this.servicios.GetEmpleado(this.empleado_id_).subscribe(
        (Response) => {
          if (Response && Response.length > 0) {
            this.empleado_id_ = Response[0].employee_id_;
            this.nombre = Response[0].employee_name_;
            this.apellidoPaterno = Response[0].employee_last_name_;
            this.apellidoMaterno = Response[0].employee_second_last_name_;
            this.sucursal = Response[0].cost_center_name_;
            this.cliente = Response[0].base_location_name_;
          } else {
            Swal.fire(
              'UPS...',
              'EL NUMERO DE ORDEN QUE INTENTAS BUSCAR NO EXISTE',
              'error'
            );
          }
        },
        (Error) => {
          console.error(Error);
        }
      );
    }
  }

  doc1(event: Event) {
    event.preventDefault();

    // Verificar si se ha seleccionado un archivo PDF o se ha tomado una foto
    if (this.selectedFile) {
      this.selectedFile;
      const datosNuevos = {
        employee_id_: this.empleado_id_,
        employee_name_: this.nombre,
        employee_last_name_: this.apellidoPaterno,
        employee_second_last_name_: this.apellidoMaterno,
        cost_center_name_: this.sucursal,
        base_location_name_: this.cliente,
        identificador: 1,
      };
      console.log(datosNuevos);

      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('payload', JSON.stringify(datosNuevos));

      this.http
        .post<any>(
          'https://acorp-it.com/scripts/API_DockiEagle/upload_AC.php',
          formData
        )
        .subscribe(
          (Response) => {
            console.log('PDF subido con éxito', Response);
            this.showAlert1 = true;
          },
          (error) => {
            console.error('Error al subir el PDF', error);
            alert(
              'Hubo un error al subir el PDF. Por favor, inténtelo de nuevo.'
            );
          }
        );
    } else if (this.photoData1) {
      const datosNuevos = {
        employee_id_: this.empleado_id_,
        employee_name_: this.nombre,
        employee_last_name_: this.apellidoPaterno,
        employee_second_last_name_: this.apellidoMaterno,
        cost_center_name_: this.sucursal,
        base_location_name_: this.cliente,
        identificador: 1,
        imagen: this.photoData1,
      };

      const formData = new FormData();
      formData.append('file', this.photoData1);
      formData.append('payload', JSON.stringify(datosNuevos));

      console.log(this.photoData);
      this.http
        .post<any>(
          'https://acorp-it.com/scripts/API_DockiEagle/upload_AC_img.php',
          formData
        )
        .subscribe(
          (Response) => {
            console.log('PDF subido con éxito', Response);
            this.showAlert1 = true;
          },
          (error) => {
            console.error('Error al subir la foto', error);
            alert(
              'Hubo un error al subir la foto. Por favor, inténtelo de nuevo.'
            );
          }
        );
    } else {
      alert(
        'Por favor, seleccione un archivo PDF o tome una foto antes de subirlo.'
      );
    }
  }

  doc2(event: Event) {
    event.preventDefault();

    // Validar fecha (acepta Date o string)
    const validation = this.validateFecha(this.examDate2);
    if (!validation.valid || !validation.date) {
      alert(validation.message);
      return;
    }

    const fechaValida = validation.date;
    // Formato YYYY-MM-DD
    const fechaISO = fechaValida.toISOString().slice(0, 10);


    console.log('Fecha válida en formato ISO:', fechaISO);
    // Verificar si se ha seleccionado un archivo PDF o se ha tomado una foto
    if (this.selectedFile) {
      this.selectedFile;
      const datosNuevos = {
        employee_id_: this.empleado_id_,
        employee_name_: this.nombre,
        employee_last_name_: this.apellidoPaterno,
        employee_second_last_name_: this.apellidoMaterno,
        cost_center_name_: this.sucursal,
        base_location_name_: this.cliente,
        currentDate_domicilio: fechaISO,
        identificador: 2,
      };
      console.log(datosNuevos);

      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('payload', JSON.stringify(datosNuevos));

      this.http
        .post<any>(
          'https://acorp-it.com/scripts/API_DockiEagle/upload_AC.php',
          formData
        )
        .subscribe(
          (Response) => {
            console.log('PDF subido con éxito', Response);
            this.showAlert2 = true;
          },
          (error) => {
            console.error('Error al subir el PDF', error);
            alert(
              'Hubo un error al subir el PDF. Por favor, inténtelo de nuevo.'
            );
          }
        );
    } else if (this.photoData2) {
      const datosNuevos = {
        employee_id_: this.empleado_id_,
        employee_name_: this.nombre,
        employee_last_name_: this.apellidoPaterno,
        employee_second_last_name_: this.apellidoMaterno,
        cost_center_name_: this.sucursal,
        base_location_name_: this.cliente,
        identificador: 2,
        currentDate_domicilio: fechaISO,
        imagen: this.photoData2,
      };

      const formData = new FormData();
      formData.append('file', this.photoData2);
      formData.append('payload', JSON.stringify(datosNuevos));

      this.http
        .post<any>(
          'https://acorp-it.com/scripts/API_DockiEagle/upload_AC_img.php',
          formData
        )
        .subscribe(
          (Response) => {
            console.log('PDF subido con éxito', Response);
            this.showAlert2 = true;
          },
          (error) => {
            console.error('Error al subir la foto', error);
            alert(
              'Hubo un error al subir la foto. Por favor, inténtelo de nuevo.'
            );
          }
        );
    } else {
      alert(
        'Por favor, seleccione un archivo PDF o tome una foto antes de subirlo.'
      );
    }
  }

  doc3(event: Event) {
    event.preventDefault();

    // Verificar si se ha seleccionado un archivo PDF o se ha tomado una foto
    if (this.selectedFile) {
      this.selectedFile;
      const datosNuevos = {
        employee_id_: this.empleado_id_,
        employee_name_: this.nombre,
        employee_last_name_: this.apellidoPaterno,
        employee_second_last_name_: this.apellidoMaterno,
        cost_center_name_: this.sucursal,
        base_location_name_: this.cliente,
        identificador: 3,
      };
      console.log(datosNuevos);

      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('payload', JSON.stringify(datosNuevos));

      this.http
        .post<any>(
          'https://acorp-it.com/scripts/API_DockiEagle/upload_AC.php',
          formData
        )
        .subscribe(
          (Response) => {
            console.log('PDF subido con éxito', Response);
            this.showAlert3 = true;
          },
          (error) => {
            console.error('Error al subir el PDF', error);
            alert(
              'Hubo un error al subir el PDF. Por favor, inténtelo de nuevo.'
            );
          }
        );
    } else if (this.photoData3) {
      const datosNuevos = {
        employee_id_: this.empleado_id_,
        employee_name_: this.nombre,
        employee_last_name_: this.apellidoPaterno,
        employee_second_last_name_: this.apellidoMaterno,
        cost_center_name_: this.sucursal,
        base_location_name_: this.cliente,
        identificador: 3,
        imagen: this.photoData3,
      };

      const formData = new FormData();
      formData.append('file', this.photoData3);
      formData.append('payload', JSON.stringify(datosNuevos));

      this.http
        .post<any>(
          'https://acorp-it.com/scripts/API_DockiEagle/upload_AC_img.php',
          formData
        )
        .subscribe(
          (Response) => {
            console.log('PDF subido con éxito', Response);
            this.showAlert3 = true;
          },
          (error) => {
            console.error('Error al subir la foto', error);
            alert(
              'Hubo un error al subir la foto. Por favor, inténtelo de nuevo.'
            );
          }
        );
    } else {
      alert(
        'Por favor, seleccione un archivo PDF o tome una foto antes de subirlo.'
      );
    }
  }
  doc4(event: Event) {
    event.preventDefault();

    // Verificar si se ha seleccionado un archivo PDF o se ha tomado una foto
    if (this.selectedFile) {
      this.selectedFile;
      const datosNuevos = {
        employee_id_: this.empleado_id_,
        employee_name_: this.nombre,
        employee_last_name_: this.apellidoPaterno,
        employee_second_last_name_: this.apellidoMaterno,
        cost_center_name_: this.sucursal,
        base_location_name_: this.cliente,
        identificador: 4,
      };
      console.log(datosNuevos);

      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('payload', JSON.stringify(datosNuevos));

      this.http
        .post<any>(
          'https://acorp-it.com/scripts/API_DockiEagle/upload_AC.php',
          formData
        )
        .subscribe(
          (Response) => {
            console.log('PDF subido con éxito', Response);
            this.showAlert4 = true;
          },
          (error) => {
            console.error('Error al subir el PDF', error);
            alert(
              'Hubo un error al subir el PDF. Por favor, inténtelo de nuevo.'
            );
          }
        );
    } else if (this.photoData4) {
      const datosNuevos = {
        employee_id_: this.empleado_id_,
        employee_name_: this.nombre,
        employee_last_name_: this.apellidoPaterno,
        employee_second_last_name_: this.apellidoMaterno,
        cost_center_name_: this.sucursal,
        base_location_name_: this.cliente,
        identificador: 4,
        imagen: this.photoData4,
      };

      const formData = new FormData();
      formData.append('file', this.photoData4);
      formData.append('payload', JSON.stringify(datosNuevos));

      console.log(this.photoData);
      this.http
        .post<any>(
          'https://acorp-it.com/scripts/API_DockiEagle/upload_AC_img.php',
          formData
        )
        .subscribe(
          (Response) => {
            console.log('PDF subido con éxito', Response);
            this.showAlert4 = true;
          },
          (error) => {
            console.error('Error al subir la foto', error);
            alert(
              'Hubo un error al subir la foto. Por favor, inténtelo de nuevo.'
            );
          }
        );
    } else {
      alert(
        'Por favor, seleccione un archivo PDF o tome una foto antes de subirlo.'
      );
    }
  }
  doc5(event: Event) {
    event.preventDefault();

    // Verificar si se ha seleccionado un archivo PDF o se ha tomado una foto
    if (this.selectedFile) {
      this.selectedFile;
      const datosNuevos = {
        employee_id_: this.empleado_id_,
        employee_name_: this.nombre,
        employee_last_name_: this.apellidoPaterno,
        employee_second_last_name_: this.apellidoMaterno,
        cost_center_name_: this.sucursal,
        base_location_name_: this.cliente,
        identificador: 5,
      };
      console.log(datosNuevos);

      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('payload', JSON.stringify(datosNuevos));

      this.http
        .post<any>(
          'https://acorp-it.com/scripts/API_DockiEagle/upload_AC.php',
          formData
        )
        .subscribe(
          (Response) => {
            console.log('PDF subido con éxito', Response);
            this.showAlert5 = true;
          },
          (error) => {
            console.error('Error al subir el PDF', error);
            alert(
              'Hubo un error al subir el PDF. Por favor, inténtelo de nuevo.'
            );
          }
        );
    } else if (this.photoData5) {
      const datosNuevos = {
        employee_id_: this.empleado_id_,
        employee_name_: this.nombre,
        employee_last_name_: this.apellidoPaterno,
        employee_second_last_name_: this.apellidoMaterno,
        cost_center_name_: this.sucursal,
        base_location_name_: this.cliente,
        identificador: 5,
        imagen: this.photoData5,
      };

      const formData = new FormData();
      formData.append('file', this.photoData5);
      formData.append('payload', JSON.stringify(datosNuevos));

      console.log(this.photoData5);
      this.http
        .post<any>(
          'https://acorp-it.com/scripts/API_DockiEagle/upload_AC_img.php',
          formData
        )
        .subscribe(
          (Response) => {
            console.log('PDF subido con éxito', Response);
            this.showAlert5 = true;
          },
          (error) => {
            console.error('Error al subir la foto', error);
            alert(
              'Hubo un error al subir la foto. Por favor, inténtelo de nuevo.'
            );
          }
        );
    } else {
      alert(
        'Por favor, seleccione un archivo PDF o tome una foto antes de subirlo.'
      );
    }
  }


  doc7(event: Event) {
    event.preventDefault();

    // Verificar si se ha seleccionado un archivo PDF
    if (this.selectedFile) {
      const datosNuevos = {
        employee_id_: this.empleado_id_,
        employee_name_: this.nombre,
        employee_last_name_: this.apellidoPaterno,
        employee_second_last_name_: this.apellidoMaterno,
        cost_center_name_: this.sucursal,
        base_location_name_: this.cliente,
        identificador: 7,
      };

      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('payload', JSON.stringify(datosNuevos));

      this.http
        .post<any>(
          'https://acorp-it.com/scripts/API_DockiEagle/upload_AC.php',
          formData
        )
        .subscribe(
          (Response) => {
            console.log('PDF subido con éxito', Response);
            this.showAlert7 = true;
          },
          (error) => {
            console.error('Error al subir el PDF', error);
            alert(
              'Hubo un error al subir el PDF. Por favor, inténtelo de nuevo.'
            );
          }
        );
    } else if (this.photos.length > 0) {
      this.stopCamera();
      const datosNuevos = {
        employee_id_: this.empleado_id_,
        employee_name_: this.nombre,
        employee_last_name_: this.apellidoPaterno,
        employee_second_last_name_: this.apellidoMaterno,
        cost_center_name_: this.sucursal,
        base_location_name_: this.cliente,
        identificador: 7,
        imagenes: this.photos,
      };

      const formData = new FormData();
      formData.append('payload', JSON.stringify(datosNuevos));

      this.http
        .post<any>(
          'https://acorp-it.com/scripts/API_DockiEagle/upload_AC_img.php',
          formData
        )
        .subscribe(
          (Response) => {
            console.log('Fotos subidas con éxito', Response);
            this.showAlert7 = true;
          },
          (error) => {
            console.error('Error al subir las fotos', error);
            alert(
              'Hubo un error al subir las fotos. Por favor, inténtelo de nuevo.'
            );
          }
        );
    } else {
      alert(
        'Por favor, seleccione un archivo PDF o tome una foto antes de subirlo.'
      );
    }
  }

  stopCamera() {
    // Detener la transmisión de video actual
    if (this.videoStream) {
      this.videoStream.getTracks().forEach((track) => track.stop());
      this.cameraOpen7 = false;
    }
  }

  doc8(event: Event) {
    event.preventDefault();

    // Verificar si se ha seleccionado un archivo PDF o se ha tomado una foto
    if (this.selectedFile) {
      this.selectedFile;
      const datosNuevos = {
        employee_id_: this.empleado_id_,
        employee_name_: this.nombre,
        employee_last_name_: this.apellidoPaterno,
        employee_second_last_name_: this.apellidoMaterno,
        cost_center_name_: this.sucursal,
        base_location_name_: this.cliente,
        identificador: 8,
      };
      console.log(datosNuevos);

      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('payload', JSON.stringify(datosNuevos));

      this.http
        .post<any>(
          'https://acorp-it.com/scripts/API_DockiEagle/upload_AC.php',
          formData
        )
        .subscribe(
          (Response) => {
            console.log('PDF subido con éxito', Response);
            this.showAlert8 = true;
          },
          (error) => {
            console.error('Error al subir el PDF', error);
            alert(
              'Hubo un error al subir el PDF. Por favor, inténtelo de nuevo.'
            );
          }
        );
    } else if (this.photoData8) {
      const datosNuevos = {
        employee_id_: this.empleado_id_,
        employee_name_: this.nombre,
        employee_last_name_: this.apellidoPaterno,
        employee_second_last_name_: this.apellidoMaterno,
        cost_center_name_: this.sucursal,
        base_location_name_: this.cliente,
        identificador: 8,
        imagen: this.photoData8,
      };

      const formData = new FormData();
      formData.append('file', this.photoData8);
      formData.append('payload', JSON.stringify(datosNuevos));

      console.log(this.photoData8);
      this.http
        .post<any>(
          'https://acorp-it.com/scripts/API_DockiEagle/upload_AC_img.php',
          formData
        )
        .subscribe(
          (Response) => {
            console.log('PDF subido con éxito', Response);
            this.showAlert8 = true;
          },
          (error) => {
            console.error('Error al subir la foto', error);
            alert(
              'Hubo un error al subir la foto. Por favor, inténtelo de nuevo.'
            );
          }
        );
    } else {
      alert(
        'Por favor, seleccione un archivo PDF o tome una foto antes de subirlo.'
      );
    }
  }

  doc9(event: Event) {
    event.preventDefault();

    // Verificar si se ha seleccionado un archivo PDF
    if (this.selectedFile) {
      const datosNuevos = {
        employee_id_: this.empleado_id_,
        employee_name_: this.nombre,
        employee_last_name_: this.apellidoPaterno,
        employee_second_last_name_: this.apellidoMaterno,
        cost_center_name_: this.sucursal,
        base_location_name_: this.cliente,
        identificador: 9,
      };

      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('payload', JSON.stringify(datosNuevos));

      this.http
        .post<any>(
          'https://acorp-it.com/scripts/API_DockiEagle/upload_AC.php',
          formData
        )
        .subscribe(
          (Response) => {
            console.log('PDF subido con éxito', Response);
            this.showAlert9 = true;
          },
          (error) => {
            console.error('Error al subir el PDF', error);
            alert(
              'Hubo un error al subir el PDF. Por favor, inténtelo de nuevo.'
            );
          }
        );
    } else if (this.photos9.length > 0) {
      this.stopCamera9();
      const datosNuevos = {
        employee_id_: this.empleado_id_,
        employee_name_: this.nombre,
        employee_last_name_: this.apellidoPaterno,
        employee_second_last_name_: this.apellidoMaterno,
        cost_center_name_: this.sucursal,
        base_location_name_: this.cliente,
        identificador: 9,
        imagenes: this.photos9,
      };

      const formData = new FormData();
      formData.append('payload', JSON.stringify(datosNuevos));

      this.http
        .post<any>(
          'https://acorp-it.com/scripts/API_DockiEagle/upload_AC_img.php',
          formData
        )
        .subscribe(
          (Response) => {
            console.log('Fotos subidas con éxito', Response);
            this.showAlert9 = true;
          },
          (error) => {
            console.error('Error al subir las fotos', error);
            alert(
              'Hubo un error al subir las fotos. Por favor, inténtelo de nuevo.'
            );
          }
        );
    } else {
      alert(
        'Por favor, seleccione un archivo PDF o tome una foto antes de subirlo.'
      );
    }
  }


  stopCamera9() {
    // Detener la transmisión de video actual
    if (this.videoStream) {
      this.videoStream.getTracks().forEach((track) => track.stop());
      this.cameraOpen9 = false;
    }
  }

  doc10(event: Event) {
    event.preventDefault();

    // Verificar si se ha seleccionado un archivo PDF o se ha tomado una foto
    if (this.selectedFile) {
      this.selectedFile;
      const datosNuevos = {
        employee_id_: this.empleado_id_,
        employee_name_: this.nombre,
        employee_last_name_: this.apellidoPaterno,
        employee_second_last_name_: this.apellidoMaterno,
        cost_center_name_: this.sucursal,
        base_location_name_: this.cliente,
        identificador: 10,
      };
      console.log(datosNuevos);

      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('payload', JSON.stringify(datosNuevos));

      this.http
        .post<any>(
          'https://acorp-it.com/scripts/API_DockiEagle/upload_AC.php',
          formData
        )
        .subscribe(
          (Response) => {
            console.log('PDF subido con éxito', Response);
            this.showAlert10 = true;
          },
          (error) => {
            console.error('Error al subir el PDF', error);
            alert(
              'Hubo un error al subir el PDF. Por favor, inténtelo de nuevo.'
            );
          }
        );
    } else if (this.photoData10) {
      const datosNuevos = {
        employee_id_: this.empleado_id_,
        employee_name_: this.nombre,
        employee_last_name_: this.apellidoPaterno,
        employee_second_last_name_: this.apellidoMaterno,
        cost_center_name_: this.sucursal,
        base_location_name_: this.cliente,
        identificador: 10,
        imagen: this.photoData10,
      };

      const formData = new FormData();
      formData.append('file', this.photoData10);
      formData.append('payload', JSON.stringify(datosNuevos));

      console.log(this.photoData10);
      this.http
        .post<any>(
          'https://acorp-it.com/scripts/API_DockiEagle/upload_AC_img.php',
          formData
        )
        .subscribe(
          (Response) => {
            console.log('PDF subido con éxito', Response);
            this.showAlert10 = true;
          },
          (error) => {
            console.error('Error al subir la foto', error);
            alert(
              'Hubo un error al subir la foto. Por favor, inténtelo de nuevo.'
            );
          }
        );
    } else {
      alert(
        'Por favor, seleccione un archivo PDF o tome una foto antes de subirlo.'
      );
    }
  }

  doc11(event: Event) {
    event.preventDefault();

    // Verificar si se ha seleccionado un archivo PDF o se ha tomado una foto
    if (this.selectedFile) {
      this.selectedFile;
      const datosNuevos = {
        employee_id_: this.empleado_id_,
        employee_name_: this.nombre,
        employee_last_name_: this.apellidoPaterno,
        employee_second_last_name_: this.apellidoMaterno,
        cost_center_name_: this.sucursal,
        base_location_name_: this.cliente,
        identificador: 11,
      };
      console.log(datosNuevos);

      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('payload', JSON.stringify(datosNuevos));

      this.http
        .post<any>(
          'https://acorp-it.com/scripts/API_DockiEagle/upload_AC.php',
          formData
        )
        .subscribe(
          (Response) => {
            console.log('PDF subido con éxito', Response);
            this.showAlert11 = true;
          },
          (error) => {
            console.error('Error al subir el PDF', error);
            alert(
              'Hubo un error al subir el PDF. Por favor, inténtelo de nuevo.'
            );
          }
        );
    } else if (this.photoData11) {
      const datosNuevos = {
        employee_id_: this.empleado_id_,
        employee_name_: this.nombre,
        employee_last_name_: this.apellidoPaterno,
        employee_second_last_name_: this.apellidoMaterno,
        cost_center_name_: this.sucursal,
        base_location_name_: this.cliente,
        identificador: 11,
        imagen: this.photoData11,
      };

      const formData = new FormData();
      formData.append('file', this.photoData11);
      formData.append('payload', JSON.stringify(datosNuevos));

      console.log(this.photoData);
      this.http
        .post<any>(
          'https://acorp-it.com/scripts/API_DockiEagle/upload_AC_img.php',
          formData
        )
        .subscribe(
          (Response) => {
            console.log('PDF subido con éxito', Response);
            this.showAlert11 = true;
          },
          (error) => {
            console.error('Error al subir la foto', error);
            alert(
              'Hubo un error al subir la foto. Por favor, inténtelo de nuevo.'
            );
          }
        );
    } else {
      alert(
        'Por favor, seleccione un archivo PDF o tome una foto antes de subirlo.'
      );
    }
  }

  doc12(event: Event) {
    event.preventDefault();

    // Validar fecha (acepta Date o string)
    const validation = this.validateFecha(this.examDate12);
    if (!validation.valid || !validation.date) {
      alert(validation.message);
      return;
    }

    const fechaValida = validation.date;
    // Formato YYYY-MM-DD
    const fechaISO = fechaValida.toISOString().slice(0, 10);


    console.log('Fecha válida en formato ISO:', fechaISO);

    // Si se ha seleccionado un archivo PDF
    if (this.selectedFile) {
      const datosNuevos = {
        employee_id_: this.empleado_id_,
        employee_name_: this.nombre,
        employee_last_name_: this.apellidoPaterno,
        employee_second_last_name_: this.apellidoMaterno,
        cost_center_name_: this.sucursal,
        base_location_name_: this.cliente,
        currentDate_medico: fechaISO,
        identificador: 12,
      };

      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('payload', JSON.stringify(datosNuevos));
      console.log(JSON.stringify(datosNuevos));
      this.http
        .post<any>(
          'https://acorp-it.com/scripts/API_DockiEagle/upload_AC.php',
          formData
        )
        .subscribe(
          (Response) => {
            console.log('PDF subido con éxito', Response);
            this.showAlert12 = true;
          },
          (error) => {
            console.error('Error al subir el PDF', error);
            alert('Hubo un error al subir el PDF. Por favor, inténtelo de nuevo.');
          }
        );

      // Si hay fotos tomadas en lugar de archivo
    } else if (this.photos12.length > 0) {
      this.stopCamera12();
      const datosNuevos = {
        employee_id_: this.empleado_id_,
        employee_name_: this.nombre,
        employee_last_name_: this.apellidoPaterno,
        employee_second_last_name_: this.apellidoMaterno,
        cost_center_name_: this.sucursal,
        base_location_name_: this.cliente,
        currentDate_medico: fechaISO,
        identificador: 12,
        imagenes: this.photos12,
      };

      const formData = new FormData();
      formData.append('payload', JSON.stringify(datosNuevos));

      this.http
        .post<any>(
          'https://acorp-it.com/scripts/API_DockiEagle/upload_AC_img.php',
          formData
        )
        .subscribe(
          (Response) => {
            console.log('Fotos subidas con éxito', Response);
            this.showAlert12 = true;
          },
          (error) => {
            console.error('Error al subir las fotos', error);
            alert('Hubo un error al subir las fotos. Por favor, inténtelo de nuevo.');
          }
        );

    } else {
      alert('Por favor, seleccione un archivo PDF o tome una foto antes de subirlo.');
    }
  }



  stopCamera12() {
    // Detener la transmisión de video actual
    if (this.videoStream) {
      this.videoStream.getTracks().forEach((track) => track.stop());
      this.cameraOpen12 = false;
    }
  }

  doc13(event: Event) {
    event.preventDefault();

    // Validar fecha (acepta Date o string)
    const validation = this.validateFecha(this.examDate13);
    if (!validation.valid || !validation.date) {
      alert(validation.message);
      return;
    }

    const fechaValida = validation.date;
    // Formato YYYY-MM-DD
    const fechaISO = fechaValida.toISOString().slice(0, 10);


    console.log('Fecha válida en formato ISO:', fechaISO);

    // Verificar si se ha seleccionado un archivo PDF o se ha tomado una foto
    if (this.selectedFile) {
      this.selectedFile;
      const datosNuevos = {
        employee_id_: this.empleado_id_,
        employee_name_: this.nombre,
        employee_last_name_: this.apellidoPaterno,
        employee_second_last_name_: this.apellidoMaterno,
        cost_center_name_: this.sucursal,
        base_location_name_: this.cliente,

        currentDate_toxicologico: fechaISO,
        identificador: 13,
      };
      console.log(datosNuevos);

      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('payload', JSON.stringify(datosNuevos));

      this.http
        .post<any>(
          'https://acorp-it.com/scripts/API_DockiEagle/upload_AC.php',
          formData
        )
        .subscribe(
          (Response) => {
            console.log('PDF subido con éxito', Response);
            this.showAlert13 = true;
          },
          (error) => {
            console.error('Error al subir el PDF', error);
            alert(
              'Hubo un error al subir el PDF. Por favor, inténtelo de nuevo.'
            );
          }
        );
    } else if (this.photoData13) {
      const datosNuevos = {
        employee_id_: this.empleado_id_,
        employee_name_: this.nombre,
        employee_last_name_: this.apellidoPaterno,
        employee_second_last_name_: this.apellidoMaterno,
        cost_center_name_: this.sucursal,

        currentDate_toxicologico: fechaISO,
        base_location_name_: this.cliente,
        identificador: 13,
        imagen: this.photoData13,
      };

      const formData = new FormData();
      formData.append('file', this.photoData13);
      formData.append('payload', JSON.stringify(datosNuevos));

      console.log(this.photoData13);
      this.http
        .post<any>(
          'https://acorp-it.com/scripts/API_DockiEagle/upload_AC_img.php',
          formData
        )
        .subscribe(
          (Response) => {
            console.log('PDF subido con éxito', Response);
            this.showAlert13 = true;
          },
          (error) => {
            console.error('Error al subir la foto', error);
            alert(
              'Hubo un error al subir la foto. Por favor, inténtelo de nuevo.'
            );
          }
        );
    } else {
      alert(
        'Por favor, seleccione un archivo PDF o tome una foto antes de subirlo.'
      );
    }
  }

  doc14(event: Event) {
    event.preventDefault();

    // Validar fecha (acepta Date o string)
    const validation = this.validateFecha(this.examDate14);
    if (!validation.valid || !validation.date) {
      alert(validation.message);
      return;
    }

    const fechaValida = validation.date;
    // Formato YYYY-MM-DD
    const fechaISO = fechaValida.toISOString().slice(0, 10);


    console.log('Fecha válida en formato ISO:', fechaISO);

    // Verificar si se ha seleccionado un archivo PDF o se ha tomado una foto
    if (this.selectedFile) {
      this.selectedFile;
      const datosNuevos = {
        employee_id_: this.empleado_id_,
        employee_name_: this.nombre,
        employee_last_name_: this.apellidoPaterno,
        employee_second_last_name_: this.apellidoMaterno,
        cost_center_name_: this.sucursal,
        base_location_name_: this.cliente,
        currentDate_sicometrico: fechaISO,
        identificador: 14,
      };
      console.log(datosNuevos);

      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('payload', JSON.stringify(datosNuevos));

      this.http
        .post<any>(
          'https://acorp-it.com/scripts/API_DockiEagle/upload_AC.php',
          formData
        )
        .subscribe(
          (Response) => {
            console.log('PDF subido con éxito', Response);
            this.showAlert14 = true;
          },
          (error) => {
            console.error('Error al subir el PDF', error);
            alert(
              'Hubo un error al subir el PDF. Por favor, inténtelo de nuevo.'
            );
          }
        );
    } else if (this.photoData14) {
      const datosNuevos = {
        employee_id_: this.empleado_id_,
        employee_name_: this.nombre,
        employee_last_name_: this.apellidoPaterno,
        employee_second_last_name_: this.apellidoMaterno,
        cost_center_name_: this.sucursal,
        base_location_name_: this.cliente,
        currentDate_sicometrico: fechaISO,
        identificador: 14,
        imagen: this.photoData14,
      };

      const formData = new FormData();
      formData.append('file', this.photoData14);
      formData.append('payload', JSON.stringify(datosNuevos));

      console.log(this.photoData14);
      this.http
        .post<any>(
          'https://acorp-it.com/scripts/API_DockiEagle/upload_AC_img.php',
          formData
        )
        .subscribe(
          (Response) => {
            console.log('PDF subido con éxito', Response);
            this.showAlert14 = true;
          },
          (error) => {
            console.error('Error al subir la foto', error);
            alert(
              'Hubo un error al subir la foto. Por favor, inténtelo de nuevo.'
            );
          }
        );
    } else {
      alert(
        'Por favor, seleccione un archivo PDF o tome una foto antes de subirlo.'
      );
    }
  }

  doc15(event: Event) {
    event.preventDefault();

    // Validar fecha (acepta Date o string)
    const validation = this.validateFecha(this.examDate15);
    if (!validation.valid || !validation.date) {
      alert(validation.message);
      return;
    }

    const fechaValida = validation.date;
    // Formato YYYY-MM-DD
    const fechaISO = fechaValida.toISOString().slice(0, 10);


    console.log('Fecha válida en formato ISO:', fechaISO);

    // Verificar si se ha seleccionado un archivo PDF o se ha tomado una foto
    if (this.selectedFile) {
      this.selectedFile;
      const datosNuevos = {
        employee_id_: this.empleado_id_,
        employee_name_: this.nombre,
        employee_last_name_: this.apellidoPaterno,
        employee_second_last_name_: this.apellidoMaterno,
        cost_center_name_: this.sucursal,
        base_location_name_: this.cliente,

        currentDate_visitaDomi: fechaISO,
        identificador: 15,
      };
      console.log(datosNuevos);

      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('payload', JSON.stringify(datosNuevos));

      this.http
        .post<any>(
          'https://acorp-it.com/scripts/API_DockiEagle/upload_AC.php',
          formData
        )
        .subscribe(
          (Response) => {
            console.log('PDF subido con éxito', Response);
            this.showAlert15 = true;
          },
          (error) => {
            console.error('Error al subir el PDF', error);
            alert(
              'Hubo un error al subir el PDF. Por favor, inténtelo de nuevo.'
            );
          }
        );
    } else if (this.photoData15) {
      const datosNuevos = {
        employee_id_: this.empleado_id_,
        employee_name_: this.nombre,
        employee_last_name_: this.apellidoPaterno,
        employee_second_last_name_: this.apellidoMaterno,
        cost_center_name_: this.sucursal,
        base_location_name_: this.cliente,
        identificador: 15,
        currentDate_visitaDomi: fechaISO,
        imagen: this.photoData15,
      };

      const formData = new FormData();
      formData.append('file', this.photoData15);
      formData.append('payload', JSON.stringify(datosNuevos));

      console.log(this.photoData15);
      this.http
        .post<any>(
          'https://acorp-it.com/scripts/API_DockiEagle/upload_AC_img.php',
          formData
        )
        .subscribe(
          (Response) => {
            console.log('PDF subido con éxito', Response);
            this.showAlert15 = true;
          },
          (error) => {
            console.error('Error al subir la foto', error);
            alert(
              'Hubo un error al subir la foto. Por favor, inténtelo de nuevo.'
            );
          }
        );
    } else {
      alert(
        'Por favor, seleccione un archivo PDF o tome una foto antes de subirlo.'
      );
    }
  }

  doc16(event: Event) {
    event.preventDefault();

    // Validar fecha (acepta Date o string)
    const validation = this.validateFecha(this.examDate16);
    if (!validation.valid || !validation.date) {
      alert(validation.message);
      return;
    }

    const fechaValida = validation.date;
    // Formato YYYY-MM-DD
    const fechaISO = fechaValida.toISOString().slice(0, 10);


    console.log('Fecha válida en formato ISO:', fechaISO);

    // Verificar si se ha seleccionado un archivo PDF o se ha tomado una foto
    if (this.selectedFile) {
      this.selectedFile;
      const datosNuevos = {
        employee_id_: this.empleado_id_,
        employee_name_: this.nombre,
        employee_last_name_: this.apellidoPaterno,
        employee_second_last_name_: this.apellidoMaterno,
        cost_center_name_: this.sucursal,

        currentDate_cartaAntecedentes: fechaISO,
        base_location_name_: this.cliente,
        identificador: 16,
      };
      console.log(datosNuevos);

      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('payload', JSON.stringify(datosNuevos));

      this.http
        .post<any>(
          'https://acorp-it.com/scripts/API_DockiEagle/upload_AC.php',
          formData
        )
        .subscribe(
          (Response) => {
            console.log('PDF subido con éxito', Response);
            this.showAlert16 = true;
          },
          (error) => {
            console.error('Error al subir el PDF', error);
            alert(
              'Hubo un error al subir el PDF. Por favor, inténtelo de nuevo.'
            );
          }
        );
    } else if (this.photoData16) {
      const datosNuevos = {
        employee_id_: this.empleado_id_,
        employee_name_: this.nombre,
        employee_last_name_: this.apellidoPaterno,
        employee_second_last_name_: this.apellidoMaterno,
        cost_center_name_: this.sucursal,
        base_location_name_: this.cliente,
        currentDate_cartaAntecedentes: fechaISO,
        identificador: 16,
        imagen: this.photoData16,
      };

      const formData = new FormData();
      formData.append('file', this.photoData16);
      formData.append('payload', JSON.stringify(datosNuevos));

      console.log(this.photoData16);
      this.http
        .post<any>(
          'https://acorp-it.com/scripts/API_DockiEagle/upload_AC_img.php',
          formData
        )
        .subscribe(
          (Response) => {
            console.log('PDF subido con éxito', Response);
            this.showAlert16 = true;
          },
          (error) => {
            console.error('Error al subir la foto', error);
            alert(
              'Hubo un error al subir la foto. Por favor, inténtelo de nuevo.'
            );
          }
        );
    } else {
      alert(
        'Por favor, seleccione un archivo PDF o tome una foto antes de subirlo.'
      );
    }
  }

  doc17(event: Event) {
    event.preventDefault();

    // Verificar si se ha seleccionado un archivo PDF o se ha tomado una foto
    if (this.selectedFile) {
      this.selectedFile;
      const datosNuevos = {
        employee_id_: this.empleado_id_,
        employee_name_: this.nombre,
        employee_last_name_: this.apellidoPaterno,
        employee_second_last_name_: this.apellidoMaterno,
        cost_center_name_: this.sucursal,
        base_location_name_: this.cliente,
        identificador: 17,
      };
      console.log(datosNuevos);

      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('payload', JSON.stringify(datosNuevos));

      this.http
        .post<any>(
          'https://acorp-it.com/scripts/API_DockiEagle/upload_AC.php',
          formData
        )
        .subscribe(
          (Response) => {
            console.log('PDF subido con éxito', Response);
            this.showAlert17 = true;
          },
          (error) => {
            console.error('Error al subir el PDF', error);
            alert(
              'Hubo un error al subir el PDF. Por favor, inténtelo de nuevo.'
            );
          }
        );
    } else if (this.photoData17) {
      const datosNuevos = {
        employee_id_: this.empleado_id_,
        employee_name_: this.nombre,
        employee_last_name_: this.apellidoPaterno,
        employee_second_last_name_: this.apellidoMaterno,
        cost_center_name_: this.sucursal,
        base_location_name_: this.cliente,
        identificador: 17,
        imagen: this.photoData17,
      };

      const formData = new FormData();
      formData.append('file', this.photoData17);
      formData.append('payload', JSON.stringify(datosNuevos));

      console.log(this.photoData17);
      this.http
        .post<any>(
          'https://acorp-it.com/scripts/API_DockiEagle/upload_AC_img.php',
          formData
        )
        .subscribe(
          (Response) => {
            console.log('PDF subido con éxito', Response);
            this.showAlert17 = true;
          },
          (error) => {
            console.error('Error al subir la foto', error);
            alert(
              'Hubo un error al subir la foto. Por favor, inténtelo de nuevo.'
            );
          }
        );
    } else {
      alert(
        'Por favor, seleccione un archivo PDF o tome una foto antes de subirlo.'
      );
    }
  }

  doc18(event: Event) {
    event.preventDefault();

    // Verificar si se ha seleccionado un archivo PDF o se ha tomado una foto
    if (this.selectedFile) {
      this.selectedFile;
      const datosNuevos = {
        employee_id_: this.empleado_id_,
        employee_name_: this.nombre,
        employee_last_name_: this.apellidoPaterno,
        employee_second_last_name_: this.apellidoMaterno,
        cost_center_name_: this.sucursal,
        base_location_name_: this.cliente,
        identificador: 18,
      };
      console.log(datosNuevos);

      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('payload', JSON.stringify(datosNuevos));

      this.http
        .post<any>(
          'https://acorp-it.com/scripts/API_DockiEagle/upload_AC.php',
          formData
        )
        .subscribe(
          (Response) => {
            console.log('PDF subido con éxito', Response);
            this.showAlert18 = true;
          },
          (error) => {
            console.error('Error al subir el PDF', error);
            alert(
              'Hubo un error al subir el PDF. Por favor, inténtelo de nuevo.'
            );
          }
        );
    } else if (this.photoData18) {
      const datosNuevos = {
        employee_id_: this.empleado_id_,
        employee_name_: this.nombre,
        employee_last_name_: this.apellidoPaterno,
        employee_second_last_name_: this.apellidoMaterno,
        cost_center_name_: this.sucursal,
        base_location_name_: this.cliente,
        identificador: 18,
        imagen: this.photoData18,
      };

      const formData = new FormData();
      formData.append('file', this.photoData18);
      formData.append('payload', JSON.stringify(datosNuevos));

      console.log(this.photoData18);
      this.http
        .post<any>(
          'https://acorp-it.com/scripts/API_DockiEagle/upload_AC_img.php',
          formData
        )
        .subscribe(
          (Response) => {
            console.log('PDF subido con éxito', Response);
            this.showAlert18 = true;
          },
          (error) => {
            console.error('Error al subir la foto', error);
            alert(
              'Hubo un error al subir la foto. Por favor, inténtelo de nuevo.'
            );
          }
        );
    } else {
      alert(
        'Por favor, seleccione un archivo PDF o tome una foto antes de subirlo.'
      );
    }
  }

  doc19(event: Event) {
    event.preventDefault();

    // Verificar si se ha seleccionado un archivo PDF o se ha tomado una foto
    if (this.selectedFile) {
      this.selectedFile;
      const datosNuevos = {
        employee_id_: this.empleado_id_,
        employee_name_: this.nombre,
        employee_last_name_: this.apellidoPaterno,
        employee_second_last_name_: this.apellidoMaterno,
        cost_center_name_: this.sucursal,
        base_location_name_: this.cliente,
        identificador: 19,
      };
      console.log(datosNuevos);

      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('payload', JSON.stringify(datosNuevos));

      this.http
        .post<any>(
          'https://acorp-it.com/scripts/API_DockiEagle/upload_AC.php',
          formData
        )
        .subscribe(
          (Response) => {
            console.log('PDF subido con éxito', Response);
            this.showAlert19 = true;
          },
          (error) => {
            console.error('Error al subir el PDF', error);
            alert(
              'Hubo un error al subir el PDF. Por favor, inténtelo de nuevo.'
            );
          }
        );
    } else if (this.photoData19) {
      const datosNuevos = {
        employee_id_: this.empleado_id_,
        employee_name_: this.nombre,
        employee_last_name_: this.apellidoPaterno,
        employee_second_last_name_: this.apellidoMaterno,
        cost_center_name_: this.sucursal,
        base_location_name_: this.cliente,
        identificador: 19,
        imagen: this.photoData19,
      };

      const formData = new FormData();
      formData.append('file', this.photoData19);
      formData.append('payload', JSON.stringify(datosNuevos));

      console.log(this.photoData19);
      this.http
        .post<any>(
          'https://acorp-it.com/scripts/API_DockiEagle/upload_AC_img.php',
          formData
        )
        .subscribe(
          (Response) => {
            console.log('PDF subido con éxito', Response);
            this.showAlert19 = true;
          },
          (error) => {
            console.error('Error al subir la foto', error);
            alert(
              'Hubo un error al subir la foto. Por favor, inténtelo de nuevo.'
            );
          }
        );
    } else {
      alert(
        'Por favor, seleccione un archivo PDF o tome una foto antes de subirlo.'
      );
    }
  }

  doc20(event: Event) {
    event.preventDefault();

    // Verificar si se ha seleccionado un archivo PDF o se ha tomado una foto
    if (this.selectedFile) {
      this.selectedFile;
      const datosNuevos = {
        employee_id_: this.empleado_id_,
        employee_name_: this.nombre,
        employee_last_name_: this.apellidoPaterno,
        employee_second_last_name_: this.apellidoMaterno,
        cost_center_name_: this.sucursal,
        base_location_name_: this.cliente,
        identificador: 20,
      };
      console.log(datosNuevos);

      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('payload', JSON.stringify(datosNuevos));

      this.http
        .post<any>(
          'https://acorp-it.com/scripts/API_DockiEagle/upload_AC.php',
          formData
        )
        .subscribe(
          (Response) => {
            console.log('PDF subido con éxito', Response);
            this.showAlert20 = true;
          },
          (error) => {
            console.error('Error al subir el PDF', error);
            alert(
              'Hubo un error al subir el PDF. Por favor, inténtelo de nuevo.'
            );
          }
        );
    } else if (this.photoData20) {
      const datosNuevos = {
        employee_id_: this.empleado_id_,
        employee_name_: this.nombre,
        employee_last_name_: this.apellidoPaterno,
        employee_second_last_name_: this.apellidoMaterno,
        cost_center_name_: this.sucursal,
        base_location_name_: this.cliente,
        identificador: 20,
        imagen: this.photoData20,
      };

      const formData = new FormData();
      formData.append('file', this.photoData20);
      formData.append('payload', JSON.stringify(datosNuevos));

      console.log(this.photoData20);
      this.http
        .post<any>(
          'https://acorp-it.com/scripts/API_DockiEagle/upload_AC_img.php',
          formData
        )
        .subscribe(
          (Response) => {
            console.log('PDF subido con éxito', Response);
            this.showAlert20 = true;
          },
          (error) => {
            console.error('Error al subir la foto', error);
            alert(
              'Hubo un error al subir la foto. Por favor, inténtelo de nuevo.'
            );
          }
        );
    } else {
      alert(
        'Por favor, seleccione un archivo PDF o tome una foto antes de subirlo.'
      );
    }
  }

  doc21(event: Event) {
    event.preventDefault();

    // Verificar si se ha seleccionado un archivo PDF o se ha tomado una foto
    if (this.selectedFile) {
      this.selectedFile;
      const datosNuevos = {
        employee_id_: this.empleado_id_,
        employee_name_: this.nombre,
        employee_last_name_: this.apellidoPaterno,
        employee_second_last_name_: this.apellidoMaterno,
        cost_center_name_: this.sucursal,
        base_location_name_: this.cliente,
        identificador: 21,
      };
      console.log(datosNuevos);

      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('payload', JSON.stringify(datosNuevos));

      this.http
        .post<any>(
          'https://acorp-it.com/scripts/API_DockiEagle/upload_AC.php',
          formData
        )
        .subscribe(
          (Response) => {
            console.log('PDF subido con éxito', Response);
            this.showAlert21 = true;
          },
          (error) => {
            console.error('Error al subir el PDF', error);
            alert(
              'Hubo un error al subir el PDF. Por favor, inténtelo de nuevo.'
            );
          }
        );
    } else if (this.photoData21) {
      const datosNuevos = {
        employee_id_: this.empleado_id_,
        employee_name_: this.nombre,
        employee_last_name_: this.apellidoPaterno,
        employee_second_last_name_: this.apellidoMaterno,
        cost_center_name_: this.sucursal,
        base_location_name_: this.cliente,
        identificador: 21,
        imagen: this.photoData21,
      };

      const formData = new FormData();
      formData.append('file', this.photoData21);
      formData.append('payload', JSON.stringify(datosNuevos));

      console.log(this.photoData21);
      this.http
        .post<any>(
          'https://acorp-it.com/scripts/API_DockiEagle/upload_AC_img.php',
          formData
        )
        .subscribe(
          (Response) => {
            console.log('PDF subido con éxito', Response);
            this.showAlert21 = true;
          },
          (error) => {
            console.error('Error al subir la foto', error);
            alert(
              'Hubo un error al subir la foto. Por favor, inténtelo de nuevo.'
            );
          }
        );
    } else {
      alert(
        'Por favor, seleccione un archivo PDF o tome una foto antes de subirlo.'
      );
    }
  }

  doc22(event: Event) {
    event.preventDefault();

    // Verificar si se ha seleccionado un archivo PDF o se ha tomado una foto
    if (this.selectedFile) {
      this.selectedFile;
      const datosNuevos = {
        employee_id_: this.empleado_id_,
        employee_name_: this.nombre,
        employee_last_name_: this.apellidoPaterno,
        employee_second_last_name_: this.apellidoMaterno,
        cost_center_name_: this.sucursal,
        base_location_name_: this.cliente,
        identificador: 22,
      };
      console.log(datosNuevos);

      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('payload', JSON.stringify(datosNuevos));

      this.http
        .post<any>(
          'https://acorp-it.com/scripts/API_DockiEagle/upload_AC.php',
          formData
        )
        .subscribe(
          (Response) => {
            console.log('PDF subido con éxito', Response);
            this.showAlert22 = true;
          },
          (error) => {
            console.error('Error al subir el PDF', error);
            alert(
              'Hubo un error al subir el PDF. Por favor, inténtelo de nuevo.'
            );
          }
        );
    } else if (this.photoData22) {
      const datosNuevos = {
        employee_id_: this.empleado_id_,
        employee_name_: this.nombre,
        employee_last_name_: this.apellidoPaterno,
        employee_second_last_name_: this.apellidoMaterno,
        cost_center_name_: this.sucursal,
        base_location_name_: this.cliente,
        identificador: 22,
        imagen: this.photoData22,
      };

      const formData = new FormData();
      formData.append('file', this.photoData22);
      formData.append('payload', JSON.stringify(datosNuevos));

      console.log(this.photoData22);
      this.http
        .post<any>(
          'https://acorp-it.com/scripts/API_DockiEagle/upload_AC_img.php',
          formData
        )
        .subscribe(
          (Response) => {
            console.log('PDF subido con éxito', Response);
            this.showAlert22 = true;
          },
          (error) => {
            console.error('Error al subir la foto', error);
            alert(
              'Hubo un error al subir la foto. Por favor, inténtelo de nuevo.'
            );
          }
        );
    } else {
      alert(
        'Por favor, seleccione un archivo PDF o tome una foto antes de subirlo.'
      );
    }
  }

  doc23(event: Event) {
    event.preventDefault();

    // Verificar si se ha seleccionado un archivo PDF o se ha tomado una foto
    if (this.selectedFile) {
      this.selectedFile;
      const datosNuevos = {
        employee_id_: this.empleado_id_,
        employee_name_: this.nombre,
        employee_last_name_: this.apellidoPaterno,
        employee_second_last_name_: this.apellidoMaterno,
        cost_center_name_: this.sucursal,
        base_location_name_: this.cliente,
        identificador: 23,
      };
      console.log(datosNuevos);

      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('payload', JSON.stringify(datosNuevos));

      this.http
        .post<any>(
          'https://acorp-it.com/scripts/API_DockiEagle/upload_AC.php',
          formData
        )
        .subscribe(
          (Response) => {
            console.log('PDF subido con éxito', Response);
            this.showAlert23 = true;
          },
          (error) => {
            console.error('Error al subir el PDF', error);
            alert(
              'Hubo un error al subir el PDF. Por favor, inténtelo de nuevo.'
            );
          }
        );
    } else if (this.photoData23) {
      const datosNuevos = {
        employee_id_: this.empleado_id_,
        employee_name_: this.nombre,
        employee_last_name_: this.apellidoPaterno,
        employee_second_last_name_: this.apellidoMaterno,
        cost_center_name_: this.sucursal,
        base_location_name_: this.cliente,
        identificador: 23,
        imagen: this.photoData23,
      };

      const formData = new FormData();
      formData.append('file', this.photoData23);
      formData.append('payload', JSON.stringify(datosNuevos));

      console.log(this.photoData23);
      this.http
        .post<any>(
          'https://acorp-it.com/scripts/API_DockiEagle/upload_AC_img.php',
          formData
        )
        .subscribe(
          (Response) => {
            console.log('PDF subido con éxito', Response);
            this.showAlert23 = true;
          },
          (error) => {
            console.error('Error al subir la foto', error);
            alert(
              'Hubo un error al subir la foto. Por favor, inténtelo de nuevo.'
            );
          }
        );
    } else {
      alert(
        'Por favor, seleccione un archivo PDF o tome una foto antes de subirlo.'
      );
    }
  }


  doc24(event: Event) {
    event.preventDefault();

    // Verificar si se ha seleccionado un archivo PDF o se ha tomado una foto
    if (this.selectedFile) {
      this.selectedFile;
      const datosNuevos = {
        employee_id_: this.empleado_id_,
        employee_name_: this.nombre,
        employee_last_name_: this.apellidoPaterno,
        employee_second_last_name_: this.apellidoMaterno,
        cost_center_name_: this.sucursal,
        base_location_name_: this.cliente,
        identificador: 24,
      };
      console.log(datosNuevos);

      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('payload', JSON.stringify(datosNuevos));

      this.http
        .post<any>(
          'https://acorp-it.com/scripts/API_DockiEagle/upload_AC.php',
          formData
        )
        .subscribe(
          (Response) => {
            console.log('PDF subido con éxito', Response);
            this.showAlert24 = true;
          },
          (error) => {
            console.error('Error al subir el PDF', error);
            alert(
              'Hubo un error al subir el PDF. Por favor, inténtelo de nuevo.'
            );
          }
        );
    } else if (this.photoData24) {
      const datosNuevos = {
        employee_id_: this.empleado_id_,
        employee_name_: this.nombre,
        employee_last_name_: this.apellidoPaterno,
        employee_second_last_name_: this.apellidoMaterno,
        cost_center_name_: this.sucursal,
        base_location_name_: this.cliente,
        identificador: 24,
        imagen: this.photoData24,
      };

      const formData = new FormData();
      formData.append('file', this.photoData24);
      formData.append('payload', JSON.stringify(datosNuevos));

      console.log(this.photoData24);
      this.http
        .post<any>(
          'https://acorp-it.com/scripts/API_DockiEagle/upload_AC_img.php',
          formData
        )
        .subscribe(
          (Response) => {
            console.log('PDF subido con éxito', Response);
            this.showAlert24 = true;
          },
          (error) => {
            console.error('Error al subir la foto', error);
            alert(
              'Hubo un error al subir la foto. Por favor, inténtelo de nuevo.'
            );
          }
        );
    } else {
      alert(
        'Por favor, seleccione un archivo PDF o tome una foto antes de subirlo.'
      );
    }
  }

  private validateFecha(fechaInput: any): { valid: boolean; message?: string; date?: Date } {
    if (fechaInput === null || fechaInput === undefined || fechaInput === '') {
      return { valid: false, message: 'Por favor, ingrese la fecha del documento.' };
    }

    // Convertir a Date si viene como string
    const date = fechaInput instanceof Date ? fechaInput : new Date(fechaInput);

    // Validar que sea una fecha válida
    if (isNaN(date.getTime())) {
      return { valid: false, message: 'La fecha ingresada no es válida. Usa el formato correcto.' };
    }

    // Normalizar horas para comparar solo la fecha (sin hora)
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const fechaComparar = new Date(date.getTime());
    fechaComparar.setHours(0, 0, 0, 0);

    // No permitir fechas en el futuro
    if (fechaComparar > hoy) {
      return { valid: false, message: 'La fecha del examen no puede ser posterior al día de hoy.' };
    }

    // Si necesitas una regla adicional, por ejemplo
    // no permitir fechas con más de X años de antigüedad, la puedes añadir aquí:
    // const yearsBackAllowed = 5;
    // const limitePasado = new Date(hoy.getFullYear() - yearsBackAllowed, hoy.getMonth(), hoy.getDate());
    // if (fechaComparar < limitePasado) return { valid: false, message: `La fecha no puede ser anterior a ${yearsBackAllowed} años.` };

    return { valid: true, date };
  }
}
