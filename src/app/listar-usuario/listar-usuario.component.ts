import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Usuario } from '../model/Usuario';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { SalvarUsuarioComponent } from '../salvar-usuario/salvar-usuario.component';
import { UsuarioService } from '../service/usuario.service';


@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: ['./listar-usuario.component.css']
})
export class ListarUsuarioComponent implements OnInit {
  
  /**
   * recebendo o objeto usuarioParam do salvar-usuario.component.ts
   * @see  <app-listar-usuario [usuarioListar]="usuarioParam" [bodyDivListar]="bodyDiv"></app-listar-usuario>  
   */
  @Input() 
  usuarioListar: Usuario;

  /**
   * recebendo o objeto bodyDiv do salvar-usuario.component.ts
   * @see  <app-listar-usuario [usuarioListar]="usuarioParam" [bodyDivListar]="bodyDiv"></app-listar-usuario>  
   */
  @Input()
  esconderComponenteListarUsuario: boolean;

  listaUsuarios: Array <Usuario> = [];

  dataSource: MatTableDataSource <Usuario>;

  displayedColumns: string[] = ['Nome', 'Sexo','Tarefas','Ações'];
 
  constructor(public dialog: MatDialog,
              public salvarUsuarioComponent: SalvarUsuarioComponent,
              public usuarioService: UsuarioService) {
  }

  ngOnInit(): void {
    this.usuarioService.getUsuarios().subscribe( listaTodosUsuarios => {
      

      this.listaUsuarios = listaTodosUsuarios;

      console.log(this.listaUsuarios);

      this.dataSource = new MatTableDataSource<Usuario>(this.listaUsuarios);

      this.salvarUsuarioComponent.esconderComponenteListarUsuario = false;
     
    });
     
  }
  
    
  ngOnChanges(changes: SimpleChanges) {
       
    
    if(this.esconderComponenteListarUsuario == false && this.usuarioListar.nome != null){
       
       this.listaUsuarios.push(this.usuarioListar);
       this.dataSource = new MatTableDataSource<Usuario>(this.listaUsuarios);
    
    } else if(this.listaUsuarios.length == 0) {
        
      this.salvarUsuarioComponent.esconderComponenteListarUsuario = true;
    
    }
     
  }
 
  confirmarExcluirUsuario(usuario: Usuario): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: "Confirma Exclusão do(a) "+usuario.nome+" ?"
    });
    dialogRef.afterClosed().subscribe(result => {
        if(result) {
            this.listaUsuarios.splice(this.listaUsuarios.indexOf(usuario),1);
            this.dataSource = new MatTableDataSource<Usuario>(this.listaUsuarios);  
            if(this.listaUsuarios.length == 0){
              this.salvarUsuarioComponent.esconderComponenteListarUsuario = true;
            }              
        }
    });
  }
    
}
 


