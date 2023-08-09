import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  template: `
    <div class="content" role="main">
      <a href="./ruta-a">Ir a Ruta A</a>
      <h2>TUU Reserva</h2>
      <div *ngIf="loading">
        <h3>El iframe está cargando. Aquí deberíamos mostrar un shimmer</h3>
        <p>Esperando mensaje del iframe para ocultar este mensaje y mostrar el contenido del microfronted.</p>
      </div>
      <!-- <iframe [ngStyle]="{'display': loading ? 'none' : 'unset'}" id="skeduIframe" style="border: 1px solid mediumslateblue;" width="100%" height="800px" src="https://haulmer-angular-wks-testing-2.azurewebsites.net/" frameborder="0"></iframe> -->
      <iframe [ngStyle]="{'display': loading ? 'none' : 'unset'}" id="skeduIframe" style="border: 1px solid mediumslateblue;" width="100%" height="800px" src="http://localhost:3000" frameborder="0"></iframe>
    </div>
  `,
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements AfterViewInit {
  public loading = true;

  listenMessages(fromOrigin: string, callback: Function) {
    console.log('[WKS] Escuchando mensajes');
    window.addEventListener('message', (event) => {
      if (event.origin !== fromOrigin) { return; }
      console.log('[WKS] Mensaje recibido:', event);
      callback(event);
    });
  }

  sendMessage(message: any, windowElement: any, targetOrigin: any) {
    console.log('[WKS] Enviando mensaje:', { message, windowElement, targetOrigin });
    windowElement.postMessage(message, targetOrigin);
  }

  ngAfterViewInit(): void {
    const skeduIframe: any = document.querySelector('#skeduIframe');
    const skeduWindow = skeduIframe.contentWindow;
    const skeduUrl = new URL(skeduIframe.getAttribute('src'));

    const initSkedu = (event: any) => {
      if (event.data.data != 'ready') return;
      this.loading = false;
      this.sendMessage({
        type: 'config',
        data: {
          accessToken: 'Bearer 13t12e3rt12'
        }
      }, skeduWindow, skeduUrl.origin)
    };

    // When recive message from iframe send configuration
    this.listenMessages(skeduUrl.origin, initSkedu);
  }
}
