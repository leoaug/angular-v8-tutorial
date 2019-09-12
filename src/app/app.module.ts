import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CommonModule, DatePipe } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListarUsuarioComponent } from './listar-usuario/listar-usuario.component';
import { SalvarUsuarioComponent } from './salvar-usuario/salvar-usuario.component';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { ReactiveFormsModule, FormsModule, FormControlDirective } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
// tslint:disable-next-line: max-line-length
import { MatInputModule, MatCardModule, MatTableModule, MatTabsModule, MatDialogModule, MatTooltipModule, MatDividerModule, MatListModule, MatProgressSpinnerModule, MatPaginatorModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { UsuarioService } from './service/usuario.service';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { LoadingDialogComponent } from './loading-dialog/loading-dialog.component';
import { ToastrModule } from 'ngx-toastr';
import { SalvarTarefaComponent } from './salvar-tarefa/salvar-tarefa.component';
import { ListarTarefaComponent } from './listar-tarefa/listar-tarefa.component';


@NgModule({
  declarations: [
    AppComponent,
    ListarUsuarioComponent,
    SalvarUsuarioComponent,
    ConfirmationDialogComponent,
    LoadingDialogComponent,
    SalvarTarefaComponent,
    ListarTarefaComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SlimLoadingBarModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSelectModule,
    MatCardModule,
    MatTableModule,
    MatTabsModule,
    MatDialogModule,
    MatTooltipModule,
    MatDividerModule,
    MatListModule,
    MatProgressSpinnerModule,
    ToastrModule.forRoot(),
    MatInputModule,
    MatPaginatorModule
  ],
  providers: [
    UsuarioService,
    DatePipe
  ],
  entryComponents: [
    ConfirmationDialogComponent,
    LoadingDialogComponent,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }
