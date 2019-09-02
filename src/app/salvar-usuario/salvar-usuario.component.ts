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

  usuarioParam: Usuario;

  bodyDiv = true;
  
  
  constructor() {
  }

  ngOnInit() {   
    this.usuario.sexo = "Masculino";
  }

  salvarUsuario(){
    this.bodyDiv = false;

    this.usuarioParam = cloneDeep(this.usuario);

    this.usuario  = new Usuario();

    this.usuario.sexo = "Masculino";


  }
}
