import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListarUsuarioComponent } from './listar-usuario/listar-usuario.component';
import { SalvarUsuarioComponent } from './salvar-usuario/salvar-usuario.component';
import { AlterarUsuarioComponent } from './alterar-usuario/alterar-usuario.component';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule, MatCardModule, MatTableModule, MatTabsModule, MatDialogModule } from '@angular/material';
import { UsuarioService } from './service/usuario.service';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ListarUsuarioComponent,
    SalvarUsuarioComponent,
    AlterarUsuarioComponent,
    ConfirmationDialogComponent 
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SlimLoadingBarModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSelectModule,
    MatCardModule,
    MatTableModule,
    MatTabsModule,
    MatDialogModule,
    MatInputModule
  ],
  providers: [
    UsuarioService  
  ],
  entryComponents: [
    ConfirmationDialogComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }
