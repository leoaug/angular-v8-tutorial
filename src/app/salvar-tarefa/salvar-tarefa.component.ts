import { Component, OnInit } from '@angular/core';
import { Tarefa } from '../model/Tarefa';
import { UsuarioService } from '../service/usuario.service';
import { Usuario } from '../model/Usuario';
import { LoadingDialogComponent } from '../loading-dialog/loading-dialog.component';
import { MatDialog, DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { TarefaService } from '../service/tarefa.service';
import { ToastrService } from 'ngx-toastr';
import { ObjetoService } from '../service/objeto.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';

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
              private tarefaService: TarefaService,
              private objetoService: ObjetoService,
              private dialog: MatDialog,
              private toast: ToastrService,
              private adapter: DateAdapter <any> ) { }

  ngOnInit() {
      const dialog =  this.dialog.open(LoadingDialogComponent, {});
      this.adapter.setLocale('pt_br');

      // inicializa o usuario da tarefa
      this.tarefa.usuario = new Usuario();
      this.tarefa.statusTarefaEnum = 'ATIVA';

      this.usuarioService.getUsuarios().subscribe (
         listaUsuarios => {
           this.listaUsuarios = listaUsuarios;
           dialog.close();
         },
         error => {
           dialog.close();
            this.toast.error('Erro ao carrgar os usuarios, causa: ' + JSON.stringify(error));


         }
      );

  }

  salvarTarefa() {

        const dialog =  this.dialog.open(LoadingDialogComponent, {});

        this.tarefaService.salvarTarefa(this.tarefa).subscribe(
            respostaTarefa => {
                this.toast.success('Tarefa Salva.', '');

                this.tarefa = this.objetoService.copiarObjeto(respostaTarefa);

                this.tarefaService.enviarTarefaParaOutroComponente(this.tarefa);

                dialog.close();
            },
            error => {
              this.toast.error('Erro ao cadastrar, causa: ' + JSON.stringify(error));

            }
        ).add(() => {
                // limpando o formulario salvar-tarefa.component.html
                this.tarefa  = new Tarefa();
                this.tarefa.usuario = new Usuario();
                this.tarefa.statusTarefaEnum = 'ATIVA';

                dialog.close();

          });


  }
  

}
