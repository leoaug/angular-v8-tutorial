import { Component, OnInit, } from '@angular/core';
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

  /**
   *
   * usado para passar para o componente listar-usuario.component.ts
   * @see <app-listar-usuario [usuarioListar]="usuarioParam" [bodyDivListar]="bodyDiv"></app-listar-usuario>
   */
  usuarioParam: Usuario;

  esconderComponenteListarUsuario = true;


    constructor(public dialog: MatDialog,
                private toast: ToastrService,
                private usuarioService: UsuarioService) {}

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
                        dialog.close();

                        this.toast.success('Usuario Cadastrado.' , '');

                        this.esconderComponenteListarUsuario = false;

                        this.usuarioParam = cloneDeep(JSON.parse(JSON.stringify(usuarioRetorno)));

                        //console.log('Sucesso!! = ' + JSON.stringify(res));
                    },
                    error => {
                        dialog.close();
                        this.toast.error('Erro ao cadastrar, causa: ' + JSON.stringify(error));
                        console.log(error);
                    }
          ).add(() => {
              //this.renderizarComponenteListarUsuario(this.li)
          });


        // limpando o formulario salvar.usuario.component.html
        this.usuario  = new Usuario();

        // setando como default o valor do radioButton do formulario salvar.usuario.component.html
        this.usuario.sexoUsuarioEnum = 'MASCULINO';

    }

    renderizarComponenteListarUsuario(listaUsuarios: Array <Usuario>){
      if (listaUsuarios && listaUsuarios.length === 0) {
          this.esconderComponenteListarUsuario = true;
      } else {
          //this.listaUsuariosEmitter.emit(this.listaUsuarios); 
          this.esconderComponenteListarUsuario = false;
      }
    }
}
