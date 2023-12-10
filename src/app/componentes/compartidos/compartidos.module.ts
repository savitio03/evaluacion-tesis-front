import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopBarComponent } from './top-bar/top-bar.component';
import { TablaComponent } from './tabla/tabla.component';
import { TopComponent } from './top/top.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogoComponent } from './dialogo/dialogo.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DialogoConfirmarComponent } from './dialogo-confirmar/dialogo-confirmar.component';

@NgModule({
  declarations: [
    TopBarComponent,
    TablaComponent,
    TopComponent,
    DialogoComponent,
    DialogoConfirmarComponent,
  ],
  imports: [
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    CommonModule,
    MatInputModule,
    MatDialogModule,
    MatSidenavModule,
    MatListModule,
    MatTooltipModule,
  ],
  exports: [
    TopBarComponent,
    RouterModule,
    TablaComponent,
    TopComponent,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatInputModule,
    MatDialogModule,
    MatSidenavModule,
    MatListModule,
    MatTooltipModule,
  ],
})
export class CompartidosModule {}
