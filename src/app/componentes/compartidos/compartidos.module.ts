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
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';

@NgModule({
  declarations: [
    TopBarComponent,
    TablaComponent,
    TopComponent,
    DialogoComponent,
    DialogoConfirmarComponent
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
    NgbModule,
    MatTableModule,
    ReactiveFormsModule,
    MatOptionModule
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
    NgbModule,
    MatTableModule,
    ReactiveFormsModule,
    MatOptionModule
  ],
})
export class CompartidosModule {}
