import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Usuario } from '../model/Usuario';
import { MatTableDataSource, MatDialog, MatPaginator } from '@angular/material';
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

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  displayedColumns: string[] = ['Nome', 'Sexo', 'Tarefas', 'Ações'];

  subscription: Subscription;

  constructor(public dialog: MatDialog,
              public salvarUsuarioComponent: SalvarUsuarioComponent,
              public toast: ToastrService,
              public usuarioService: UsuarioService) {
  }

  ngOnInit(): void {

    this.carregarListaUsuarios();

    // só ira chamar nos evento do componente pai salvar-usuario.component.ts (onclick, e etc)
    this.subscription = this.usuarioService.getEnviarUsuarioSubject().subscribe(() => {

          this.dataSource = new MatTableDataSource<Usuario>(this.listaUsuarios);
          this.dataSource.paginator = this.paginator;
          console.log(this.listaUsuarios);

    });

  }

  carregarListaUsuarios() {

      const dialog =  this.dialog.open(LoadingDialogComponent, {});

      this.usuarioService.getUsuarios().subscribe (

      listaTodosUsuarios => {

                  this.listaUsuarios.push(...listaTodosUsuarios);

                  this.salvarUsuarioComponent.esconderComponenteListarUsuario = false;

                  // só ira chamar nos evento do componente pai salvar-usuario.component.ts (onclick, e etc)
                  this.usuarioService.enviarUsuarioSubject.subscribe((usuarioRetorno) => {

                      this.listaUsuarios.push(usuarioRetorno);

                  }).add(() => {
                      this.dataSource = new MatTableDataSource<Usuario>(this.listaUsuarios);
                      this.renderizarComponenteListarUsuario(this.listaUsuarios);
                      this.dataSource.paginator = this.paginator;
                      dialog.close();
                  });


          },
          error => {
              this.toast.error('Erro ao carregar os usuários, causa: ', JSON.stringify(error));
              dialog.close();
              console.log(error);
          }
      // semelhante ao finally do anguar 1, sempre será excutado depois dos promisess
      ).add(() => {
          this.dataSource = new MatTableDataSource<Usuario>(this.listaUsuarios);
          this.renderizarComponenteListarUsuario(this.listaUsuarios);
          this.dataSource.paginator = this.paginator;
          dialog.close();
      });

  }

  ngOnDestroy() {
      this.subscription.unsubscribe();
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit() {
      //this.renderizarComponenteListarUsuario(this.listaUsuarios);
     
      //if(this.dataSource ){
        //this.dataSource = new MatTableDataSource<Usuario>(this.listaUsuarios);
         //this.dataSource.paginator = this.paginator;
        //console.log('insercaoo ngAfterViewInit= ' + JSON.stringify(this.listaUsuarios));
      //}

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



