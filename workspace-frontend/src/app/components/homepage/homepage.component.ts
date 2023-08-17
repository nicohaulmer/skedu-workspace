import { Component } from '@angular/core';
import { IframeMessage, IframeWindowMessages } from 'src/app/utils/iframe-window-messages';

@Component({
  selector: 'app-homepage',
  template: `
    <div class="content" role="main">
      <a href="./ruta-a">Ir a Ruta A</a>
      <h2>TUU Reserva</h2>
      <div *ngIf="loading">
        <h3>El iframe está cargando. Mientras deberíamos mostrar un shimmer aquí jaja</h3>
      </div>
      <!-- <iframe (load)="iframeLoaded()" [ngStyle]="{'display': loading ? 'none' : 'unset'}" id="skeduIframe" style="border: 1px solid mediumslateblue;" width="100%" height="700px" src="https://haulmer-angular-wks-testing-2.azurewebsites.net/" frameborder="0"></iframe> -->
      <iframe (load)="iframeLoaded()" [ngStyle]="{'display': loading ? 'none' : 'unset'}" id="skeduIframe" style="border: 1px solid mediumslateblue;" width="100%" height="700px" src="http://localhost:3000" frameborder="0"></iframe>
    </div>
  `,
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {
  public loading = true;

  public iframeLoaded(): void {
      console.log(`[${window.origin}] El iframe está cargado`);
      const skeduIframe: any = document.querySelector('#skeduIframe');
      const skeduWindow = skeduIframe.contentWindow;
      const skeduUrl = new URL(skeduIframe.getAttribute('src'));

      // Send config to iframe every .5sec
      let currentTry = 0;
      const maxTries = 10;
      const sendIframeMsg = setInterval(() => {
          if (currentTry >= maxTries) {
              clearInterval(sendIframeMsg);
              return;
          }
          currentTry++;

          IframeWindowMessages.sendMessage(skeduWindow, skeduUrl.origin, {
              type: 'CONFIG',
              payload: {
                  accessToken: 'Bearer 13t12e3rt12'
              }
          });
      }, 500);

      // Listen for iframe ready message and stop sending config
      IframeWindowMessages.listenMessages(skeduUrl.origin, (event: MessageEvent<IframeMessage>) => {
          if (event.data.type !== 'READY') {
              return;
          }
          this.loading = false;
          if (clearInterval) {
              clearInterval(sendIframeMsg);
          }
      });
  }
}
