import { Component, OnInit } from '@angular/core';
import { Tarefa } from '../model/Tarefa';
import { UsuarioService } from '../service/usuario.service';
import { Usuario } from '../model/Usuario';
import { LoadingDialogComponent } from '../loading-dialog/loading-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-salvar-tarefa',
  templateUrl: './salvar-tarefa.component.html',
  styleUrls: ['./salvar-tarefa.component.css']
})
export class SalvarTarefaComponent implements OnInit {

  tarefa: Tarefa = new Tarefa();

  listaUsuarios: Array <Usuario> = [];

  constructor(private usuarioService: UsuarioService,
              private dialog: MatDialog) { }

  ngOnInit() {
      const dialog =  this.dialog.open(LoadingDialogComponent, {});

      // inicializa o usuario da tarefa
      this.tarefa.usuario = new Usuario();

      this.usuarioService.getUsuarios().subscribe (
         listaUsuarios => {
           this.listaUsuarios = listaUsuarios;
           dialog.close();
         }
      );

  }

}
