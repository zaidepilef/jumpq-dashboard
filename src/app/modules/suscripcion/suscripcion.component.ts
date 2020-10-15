import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-suscripcion',
  templateUrl: './suscripcion.component.html',
  styleUrls: ['./suscripcion.component.sass']
})
export class SuscripcionComponent implements OnInit {
  panelPrincipal:boolean;
  constructor() { }

  ngOnInit(): void {
    this.panelPrincipal = true;
  }

}
