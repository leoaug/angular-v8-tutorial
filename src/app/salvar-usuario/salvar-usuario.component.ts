import { Component, OnInit } from '@angular/core';
import { Usuario } from '../model/Usuario';

@Component({
  selector: 'app-salvar-usuario',
  templateUrl: './salvar-usuario.component.html',
  styleUrls: ['./salvar-usuario.component.css']
})
export class SalvarUsuarioComponent implements OnInit {
 

  usuario: Usuario = new Usuario();


  constructor() {
  }

  ngOnInit() {
    
    this.usuario.sexo = "Masculino";
  }

  salvarUsuario(usuario: Usuario){
    console.log(usuario);
    usuario.nome = "";
    usuario.sexo = "Masculino";
  }
}
