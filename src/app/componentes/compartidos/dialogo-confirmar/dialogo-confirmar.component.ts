import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogo-confirmar',
  templateUrl: './dialogo-confirmar.component.html',
  styleUrls: ['./dialogo-confirmar.component.css'],
})
export class DialogoConfirmarComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogoConfirmarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { mensaje: string, mensajeDialogo: string }
  ) {}

  cerrarDialogo() {
    this.dialogRef.close(false); // Cierra el diálogo con false (cancelar)
  }

  confirmarAccion() {
    this.dialogRef.close(true); // Cierra el diálogo con true (aceptar)
  }
}
