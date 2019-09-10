import { Component, OnInit } from '@angular/core';
import { Usuario } from '../model/Usuario';
import { UsuarioService } from '../service/usuario.service';
import { MatDialog } from '@angular/material';
import { LoadingDialogComponent } from '../loading-dialog/loading-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-salvar-usuario',
  templateUrl: './salvar-usuario.component.html',
  styleUrls: ['./salvar-usuario.component.css']
})
export class SalvarUsuarioComponent implements OnInit {

    usuario: Usuario = new Usuario();

    esconderComponenteListarUsuario = true;


    constructor(public dialog: MatDialog,
                private toast: ToastrService,
                public usuarioService: UsuarioService) {
    }

    ngOnInit() {
        this.usuario.sexoUsuarioEnum = 'MASCULINO';
    }


    salvarUsuario() {
        const dialog =  this.dialog.open(LoadingDialogComponent, {});

        // salva o usuario usando serviço REST
        this.usuarioService.salvarUsuario(this.usuario)
          .subscribe(
              usuarioRetorno => {

                  this.toast.success('Usuario Cadastrado.' , '');

                  this.esconderComponenteListarUsuario = false;

                  this.usuario = cloneDeep(JSON.parse(JSON.stringify(usuarioRetorno)));
                  this.usuario.preEditar = false;

                  // commando para enviar o objeto usuario para o componente listat-usuario.component.ts
                  this.usuarioService.enviarUsuarioSubject.next(JSON.parse(JSON.stringify(this.usuario)));

              },
              error => {

                  this.toast.error('Erro ao cadastrar, causa: ' + JSON.stringify(error));
                  console.log(error);
              }
          ).add(() => {
                // limpando o formulario salvar.usuario.component.html
                this.usuario  = new Usuario();

                // setando como default o valor do radioButton do formulario salvar.usuario.component.html
                this.usuario.sexoUsuarioEnum = 'MASCULINO';   

                dialog.close();
        });


        

    }

}
