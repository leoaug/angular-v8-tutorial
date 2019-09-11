import { Component, OnInit } from '@angular/core';
import { Tarefa } from '../model/Tarefa';
import { UsuarioService } from '../service/usuario.service';
import { Usuario } from '../model/Usuario';
import { LoadingDialogComponent } from '../loading-dialog/loading-dialog.component';
import { MatDialog, DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-salvar-tarefa',
  templateUrl: './salvar-tarefa.component.html',
  styleUrls: ['./salvar-tarefa.component.css'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class SalvarTarefaComponent implements OnInit {

  tarefa: Tarefa = new Tarefa();

  listaUsuarios: Array <Usuario> = [];

  constructor(private usuarioService: UsuarioService,
              private dialog: MatDialog,
              private adapter: DateAdapter <any> ) { }

  ngOnInit() {
      const dialog =  this.dialog.open(LoadingDialogComponent, {});
      this.adapter.setLocale('pt_br');

      // inicializa o usuario da tarefa
      this.tarefa.usuario = new Usuario();

      this.usuarioService.getUsuarios().subscribe (
         listaUsuarios => {
           this.listaUsuarios = listaUsuarios;
           dialog.close();
         }
      );

  }

  salvarTarefa() {

    console.log(this.tarefa);

  }

}
