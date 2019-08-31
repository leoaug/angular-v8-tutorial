import { Component, OnInit } from '@angular/core';
import { Usuario } from '../model/Usuario';


/* 
const USUARIOS: Usuario[] = [
  {nome: 'Leonardo', sexo: 'Masculino'},
  {nome: 'Josias', sexo: 'Masculino'}, 
];
*/

@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: ['./listar-usuario.component.css']
})
export class ListarUsuarioComponent implements OnInit {

  listaUsuarios: Array <Usuario> = [];

  displayedColumns: string[] = ['Nome', 'Sexo'];
  
  constructor() {
  }

  ngOnInit() {
    let usuario = new Usuario();
    usuario.nome = "Leonardo";
    usuario.sexo = "Masculino";
    this.listaUsuarios.push(usuario);
  }
 

}
