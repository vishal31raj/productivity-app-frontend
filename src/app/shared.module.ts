import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { HeaderPage } from './pages/shared/header/header.page';
import { LoaderComponent } from './components/loader/loader.component';
import { EmptyListComponent } from './components/empty-list/empty-list.component';
import { AvatarImageComponent } from './components/avatar-image/avatar-image.component';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { ImagePickerComponent } from './components/image-picker/image-picker.component';

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
  ],
})
export class SharedModule {}
