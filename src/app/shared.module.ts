import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { HeaderPage } from './pages/dashboard/shared/header/header.page';
import { LoaderComponent } from './components/loader/loader.component';
import { EmptyListComponent } from './components/empty-list/empty-list.component';
import { AvatarImageComponent } from './components/avatar-image/avatar-image.component';
import { PriorityBadgeComponent } from './components/priority-badge/priority-badge.component';
import { StatusChipComponent } from './components/status-chip/status-chip.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule,
    HeaderPage,
    LoaderComponent,
    EmptyListComponent,
    AvatarImageComponent,
    PriorityBadgeComponent,
    StatusChipComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule,
    HeaderPage,
    LoaderComponent,
    EmptyListComponent,
    AvatarImageComponent,
    PriorityBadgeComponent,
    StatusChipComponent
  ],
})
export class SharedModule {}
