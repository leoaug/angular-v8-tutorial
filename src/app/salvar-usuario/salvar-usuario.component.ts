import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Usuario } from '../model/Usuario';
import * as cloneDeep from 'lodash/cloneDeep';

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

  bodyDiv = true;
  
  
  constructor() {
  }

  ngOnInit() {   
    this.usuario.sexo = "Masculino";
  }

  salvarUsuario(){
    this.bodyDiv = false;

    // copiando o model usuario para usuarioParam para passar para o componente listar-usuario.component.ts
    this.usuarioParam = cloneDeep(this.usuario);

    //limpando o formulario salvar.usuario.component.html
    this.usuario  = new Usuario();

    //setando como default o valor do radioButton do formulario salvar.usuario.component.html
    this.usuario.sexo = "Masculino";


  }
}
