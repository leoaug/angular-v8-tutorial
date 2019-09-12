import { Component, OnInit } from '@angular/core';
import { Tarefa } from '../model/Tarefa';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { TarefaService } from '../service/tarefa.service';
import { Subscription } from 'rxjs';
import { LoadingDialogComponent } from '../loading-dialog/loading-dialog.component';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listar-tarefa',
  templateUrl: './listar-tarefa.component.html',
  styleUrls: ['./listar-tarefa.component.css']
})
export class ListarTarefaComponent implements OnInit {

  listaTarefas: Array <Tarefa> = [];

  dataSource: MatTableDataSource <Tarefa>;

  displayedColumns: string[] = ['Nome', 'Status', 'Usuário', 'Data Início', 'Data Fim' ];


  subscription: Subscription;


  constructor(private tarefaService: TarefaService,
              private dialog: MatDialog,
              public datePipe: DatePipe,
              private toastService: ToastrService) { }

  ngOnInit() {
      this.carregarListaTarefas();

      this.subscription = this.tarefaService.escutarTarefaDeOutroComponente().subscribe(
          () => {
             this.dataSource = new  MatTableDataSource <Tarefa> (this.listaTarefas);
          }
      );

  }

  carregarListaTarefas() {
      const dialog =  this.dialog.open(LoadingDialogComponent, {});

      this.tarefaService.getTarefas().subscribe(
        listaTodasTarefas => {
            this.listaTarefas.push(...listaTodasTarefas);
            this.dataSource = new MatTableDataSource <Tarefa> (this.listaTarefas);


            this.tarefaService.receberTarefaDeOutroComponente().subscribe(tarefaRetorno => {
                    this.listaTarefas.push(tarefaRetorno);
                    this.dataSource = new MatTableDataSource <Tarefa> (this.listaTarefas);
            }).add(() => {
                    dialog.close();
            });


        },
        error => {

          this.toastService.error('Erro ao carregar as tarefas, causa: ', JSON.stringify(error));

          console.log(error);

          //dialog.close();

        }
    ).add(() => {
          dialog.close();
    });

  }

  ngOnDestroy() {
      this.subscription.unsubscribe();
  }
  

}
