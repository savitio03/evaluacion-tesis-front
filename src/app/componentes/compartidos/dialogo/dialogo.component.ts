import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogo',
  templateUrl: './dialogo.component.html',
  styleUrls: ['./dialogo.component.css'],
})
export class DialogoComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { mensaje: string; mensajeDialogo: string }
  ) {}
}
