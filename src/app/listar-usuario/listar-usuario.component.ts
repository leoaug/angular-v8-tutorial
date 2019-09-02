import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Usuario } from '../model/Usuario';
import { MatTableDataSource } from '@angular/material';


@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: ['./listar-usuario.component.css']
})
export class ListarUsuarioComponent implements OnInit {
  
  
  @Input() 
  usuarioListar: Usuario;

  @Input()
  bodyDivListar: boolean;

  listaUsuarios: Array <Usuario> = [];

  dataSource: MatTableDataSource <Usuario>;

  displayedColumns: string[] = ['Nome', 'Sexo'];
 
  constructor() {
    //this.listaUsuarios = [];
    this.dataSource = new MatTableDataSource<Usuario>();
  }

  ngOnInit(): void {
   
  }
  
    
  ngOnChanges(changes: SimpleChanges) {
    
    

    console.log("caiu no ngOnChanges bodyDivListar = "+this.bodyDivListar);
    //console.log(this.usuarioListar);
    
    if(this.bodyDivListar == true){
      this.listaUsuarios = [];
    } else {
      this.listaUsuarios.push(this.usuarioListar);
      //this.dataSource = new MatTableDataSource<Usuario>(this.listaUsuarios);

      this.dataSource.data.push(this.usuarioListar);
    }

   
    console.log(this.listaUsuarios);


    //this.dataSource.data.push(this.usuarioListar);
    
    //this.dataSource = new MatTableDataSource<Usuario>(changes.usuario.currentValue);
  }
 
 
    
}
 


