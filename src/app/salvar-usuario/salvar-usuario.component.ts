import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Usuario } from '../model/Usuario';
import * as cloneDeep from 'lodash/cloneDeep';
import { UsuarioService } from '../service/usuario.service';

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
   * @see  <app-listar-usuario [usuarioListar]="usuarioParam" [bodyDivListar]="bodyDiv"></app-listar-usuario>  
   */
  usuarioParam: Usuario;

  esconderComponenteListarUsuario = true;
  
  
  constructor(private usuarioService: UsuarioService) {
  }

  ngOnInit() {   
    this.usuario.sexoUsuarioEnum = "MASCULINO";
  }

  salvarUsuario(){
    this.esconderComponenteListarUsuario = false;

    // copiando o model usuario para usuarioParam para passar para o componente listar-usuario.component.ts
    this.usuarioParam = cloneDeep(this.usuario);


    // salva o usuario usando serviço REST
    this.usuarioService.salvarUsuario(this.usuario)
      .subscribe(
                res => console.log("Sucesso!! = " + JSON.stringify(res)), 
                error => console.log(error)
      );


    //limpando o formulario salvar.usuario.component.html
    this.usuario  = new Usuario();

    //setando como default o valor do radioButton do formulario salvar.usuario.component.html
    this.usuario.sexoUsuarioEnum = "MASCULINO";


  }
}
