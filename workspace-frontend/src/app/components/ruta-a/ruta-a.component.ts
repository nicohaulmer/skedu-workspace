import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ruta-a',
  template: `
    <div class="content" role="main">
      <a href="/">Ir a inicio</a>
      <h2>Ruta A</h2>
      <p>Sin el iframe</p>
    </div>
  `,
  styleUrls: ['./ruta-a.component.scss']
})
export class RutaAComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
