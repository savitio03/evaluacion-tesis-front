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
@NgModule({
  declarations: [TopBarComponent, TablaComponent, TopComponent, DialogoComponent],
  imports: [
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    CommonModule,
    MatInputModule,
    MatDialogModule,
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
  ],
})
export class CompartidosModule {}
