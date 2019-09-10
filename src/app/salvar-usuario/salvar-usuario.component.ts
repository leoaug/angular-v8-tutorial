import { Component, OnInit } from '@angular/core';
import { Usuario } from '../model/Usuario';

import { UsuarioService } from '../service/usuario.service';
import { cloneDeep } from 'lodash';
import { MatDialog } from '@angular/material';
import { LoadingDialogComponent } from '../loading-dialog/loading-dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-salvar-usuario',
  templateUrl: './salvar-usuario.component.html',
  styleUrls: ['./salvar-usuario.component.css']
})
export class SalvarUsuarioComponent implements OnInit {

  usuario: Usuario = new Usuario();

  usuarioParam: Usuario;

  //listaUsuarios: Array <Usuario> = [];

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

        // copiando o model usuario para usuarioParam para passar para o componente listar-usuario.component.ts
        this.usuarioParam = cloneDeep(this.usuario);

        this.usuarioParam.id = null;

        // salva o usuario usando serviço REST
        this.usuarioService.salvarUsuario(this.usuarioParam)
          .subscribe(
              usuarioRetorno => {

                  this.toast.success('Usuario Cadastrado.' , '');

                  this.esconderComponenteListarUsuario = false;

                  this.usuarioParam = cloneDeep(JSON.parse(JSON.stringify(usuarioRetorno)));

                  //this.listaUsuarios.push( this.usuarioParam);

                  // comando para guarda a listaUsuarioParams no  UsuarioService para recuperar no
                  // componente listar-usuario.components.ts
                  this.usuarioService.enviarUsuarioSubject.next(this.usuarioParam);

              },
              error => {

                  this.toast.error('Erro ao cadastrar, causa: ' + JSON.stringify(error));
                  console.log(error);
              }
          ).add(() => {
              //this.renderizarComponenteListarUsuario(this.listaUsuarios);
              //this.esconderComponenteListarUsuario = false;

               dialog.close();
          });


        // limpando o formulario salvar.usuario.component.html
        this.usuario  = new Usuario();

        // setando como default o valor do radioButton do formulario salvar.usuario.component.html
        this.usuario.sexoUsuarioEnum = 'MASCULINO';

    }

    ngAfterViewInit() {
      //this.renderizarComponenteListarUsuario(this.listaUsuarios);
      //this.esconderComponenteListarUsuario = false;

    }

    /** 
    renderizarComponenteListarUsuario(listaUsuarios: Array <Usuario>) {
      if (listaUsuarios && listaUsuarios.length === 0) {
          this.esconderComponenteListarUsuario = true;
      } else {
          this.esconderComponenteListarUsuario = false;
      }
    }
    */
}
