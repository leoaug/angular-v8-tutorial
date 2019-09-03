import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Usuario } from '../model/Usuario';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { SalvarUsuarioComponent } from '../salvar-usuario/salvar-usuario.component';


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
  bodyDivListar: boolean;

  listaUsuarios: Array <Usuario> = [];

  dataSource: MatTableDataSource <Usuario>;

  displayedColumns: string[] = ['Nome', 'Sexo','Ações'];
 
  constructor(public dialog: MatDialog,public salvarUsuarioComponent: SalvarUsuarioComponent) {
  }

  ngOnInit(): void {
  }
  
    
  ngOnChanges(changes: SimpleChanges) {
        
    if(this.bodyDivListar == false){
      this.listaUsuarios.push(this.usuarioListar);
      this.dataSource = new MatTableDataSource<Usuario>(this.listaUsuarios);
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
              this.salvarUsuarioComponent.bodyDiv = true;
            }              
        }
    });
  }
    
}
 


