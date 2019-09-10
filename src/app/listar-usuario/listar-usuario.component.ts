import { Component, OnInit, Input } from '@angular/core';
import { Usuario } from '../model/Usuario';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { SalvarUsuarioComponent } from '../salvar-usuario/salvar-usuario.component';
import { UsuarioService } from '../service/usuario.service';
import { LoadingDialogComponent } from '../loading-dialog/loading-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { Subscription, Observable } from 'rxjs';


@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: ['./listar-usuario.component.css']
})
export class ListarUsuarioComponent implements OnInit {


  listaUsuarios: Array <Usuario> = [];

  dataSource: MatTableDataSource <Usuario>;

  displayedColumns: string[] = ['Nome', 'Sexo', 'Tarefas', 'Ações'];

  subscription: Subscription;

  constructor(public dialog: MatDialog,
              public salvarUsuarioComponent: SalvarUsuarioComponent,
              public toast: ToastrService,
              public usuarioService: UsuarioService) {
  }

  ngOnInit(): void {

    this.carregarListaUsuarios();

    // só ira carega nos evento do componente pai (onclick, e etc)
    this.subscription = this.usuarioService.getEnviarUsuarioSubject()
      .subscribe(() => {
          this.dataSource = new MatTableDataSource<Usuario>(this.listaUsuarios);
          console.log(this.listaUsuarios);
      });

  }

  carregarListaUsuarios() {
      const dialog =  this.dialog.open(LoadingDialogComponent, {});


      this.usuarioService.getUsuarios().subscribe (

      listaTodosUsuarios => {

                  this.listaUsuarios.push(...listaTodosUsuarios);

                  this.salvarUsuarioComponent.esconderComponenteListarUsuario = false;

                  
                  this.usuarioService.enviarUsuarioSubject.subscribe((usuarioRetorno) => {

                      // recuperar a lista que veio do componente salvar-usuario.component.ts
                      // com o comando (this.usuarioService.listaUsuariosSubject.next(this.listaUsuarioParams))
                      // so concatenar akiiii
                      this.listaUsuarios.push(usuarioRetorno);

                  }).add(() => {
                      this.dataSource = new MatTableDataSource<Usuario>(this.listaUsuarios);
                      this.renderizarComponenteListarUsuario(this.listaUsuarios);
                      console.log('insercaoo ngOnInit (primeiro add )= ' + JSON.stringify(this.listaUsuarios));
                      dialog.close();
                  });
                  

          },
          error => {
              this.toast.error('Erro ao carregar os usuários, causa: ', JSON.stringify(error));
              dialog.close(),
              console.log(error)
          }
      // semelhante ao finally do anguar 1, sempre será excutado depois dos promisess
      ).add(() => {
          this.dataSource = new MatTableDataSource<Usuario>(this.listaUsuarios);
          this.renderizarComponenteListarUsuario(this.listaUsuarios);
          //this.renderizarComponenteListarUsuario(this.listaUsuarios);
          //adiconando no mat-datatable do material design
          //
          console.log('insercaoo ngOnInit (segundo add )= ' + JSON.stringify(this.listaUsuarios));

          dialog.close();
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit() {
      this.renderizarComponenteListarUsuario(this.listaUsuarios);
      //if(this.dataSource ){
        //this.dataSource = new MatTableDataSource<Usuario>(this.listaUsuarios);
        //console.log('insercaoo ngAfterViewInit= ' + JSON.stringify(this.listaUsuarios));
      //}

  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnChanges() {

    //this.renderizarComponenteListarUsuario(this.listaUsuarios);
    //this.dataSource = new MatTableDataSource<Usuario>(this.listaUsuarios);
    /** 
    // tslint:disable-next-line: triple-equals
    if (this.salvarUsuarioComponent.esconderComponenteListarUsuario == false &&
        this.usuarioListar && 
        this.usuarioListar.nome != null &&
        this.usuarioListar.id != null) {

    
      

    // tslint:disable-next-line: triple-equals
    } 
*/
     //this.dataSource = new MatTableDataSource<Usuario>(this.listaUsuarios);
    //this.renderizarComponenteListarUsuario(this.listaUsuarios);


    console.log("lista usuarios adicionados ngOnChanges()" +this.listaUsuarios);
  }

  confirmarExcluirUsuario(usuario: Usuario): void {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '350px',
        data: 'Confirma Exclusão do(a) ' + usuario.nome + ' ?'
      });
      dialogRef.afterClosed().subscribe(result => {
          if (result) {

              this.usuarioService.excluirUsuario(usuario).subscribe (
                    retornoUsuario => (

                          this.toast.success('Usuário Excluído', ''),

                          this.listaUsuarios.splice(this.listaUsuarios.indexOf(usuario), 1),

                          this.dataSource = new MatTableDataSource <Usuario> (this.listaUsuarios)

                    ),
                    error => (
                          console.log(error),
                          this.toast.error('Erro ao excluir o Usuário, causa: ', JSON.stringify(error))
                    ),

              ).add(() => {
                  this.renderizarComponenteListarUsuario(this.listaUsuarios);

              });

          }
      });
  }

  renderizarComponenteListarUsuario(listaUsuarios: Array <Usuario>){
    if (listaUsuarios && listaUsuarios.length === 0) {
        this.salvarUsuarioComponent.esconderComponenteListarUsuario = true;
    } else {
        //this.listaUsuariosEmitter.emit(this.listaUsuarios); 
        this.salvarUsuarioComponent.esconderComponenteListarUsuario = false;
    }
  }


}



