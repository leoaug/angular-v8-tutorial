import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Usuario } from '../model/Usuario';
import { MatTableDataSource, MatDialog, MatPaginator } from '@angular/material';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { SalvarUsuarioComponent } from '../salvar-usuario/salvar-usuario.component';
import { UsuarioService } from '../service/usuario.service';
import { LoadingDialogComponent } from '../loading-dialog/loading-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { Subscription, Observable } from 'rxjs';
import { cloneDeep } from 'lodash';


@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: ['./listar-usuario.component.css']
})
export class ListarUsuarioComponent implements OnInit {


  listaUsuarios: Array <Usuario> = [];

  listaUsuariosAntesDaEdicao: Array <Usuario> = [];

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

    // só ira ficar 'escutando' os eventos do comando 'this.usuarioService.enviarUsuarioParaOutroComponente(this.usuario);
    // do componente pai salvar-usuario.component.ts (onclick, e etc)
    this.subscription = this.usuarioService.escutarUsuarioDeOutroComponente().subscribe(() => {

          this.dataSource = new MatTableDataSource<Usuario>(this.listaUsuarios);
          this.dataSource.paginator = this.paginator;

    });

  }

  carregarListaUsuarios() {

      const dialog =  this.dialog.open(LoadingDialogComponent, {});

      this.usuarioService.getUsuarios().subscribe (

      listaTodosUsuarios => {

                  this.listaUsuarios.push(...listaTodosUsuarios);

                  this.salvarUsuarioComponent.esconderComponenteListarUsuario = false;

                  this.usuarioService.preencheListaComNovosAtributos(this.listaUsuarios);

                  console.log('carregando todos = ' + JSON.stringify(this.listaUsuarios));

                  // só ira chamar nos evento do componente pai salvar-usuario.component.ts (onclick, e etc)
                  this.usuarioService.receberUsuarioDeOutroComponente().subscribe((usuarioRetorno) => {


                      this.listaUsuarios.push(usuarioRetorno);

                      this.salvarUsuarioComponent.esconderComponenteListarUsuario = false;

                      this.usuarioService.preencheListaComNovosAtributos(this.listaUsuarios);

                      console.log('carregando todos com salvar = ' + JSON.stringify(this.listaUsuarios));

                      this.dataSource = new MatTableDataSource<Usuario>(this.listaUsuarios);

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
      // this.renderizarComponenteListarUsuario(this.listaUsuarios);
      if (this.dataSource ) {

        //this.dataSource = new MatTableDataSource<Usuario>(this.listaUsuarios);
         // this.dataSource.paginator = this.paginator;
      }

  }


  editarUsuario(usuario: Usuario, indexTable: number) {

      this.usuarioService.editarUsuario(usuario, indexTable, this.listaUsuarios, this.listaUsuariosAntesDaEdicao);

  }

  confirmarEditarUsuario(usuario: Usuario, indexTable: number) {

    const dialog =  this.dialog.open(LoadingDialogComponent, {});

    this.usuarioService.alterarUsuario(usuario).subscribe (
        sucesso => {
            this.usuarioService.confirmarEditarUsuario(usuario, indexTable, this.dataSource , this.listaUsuarios, this.listaUsuariosAntesDaEdicao);
            dialog.close();
            this.toast.success('Usuário Editado.', '');
        },
        error => {
            this.toast.error('Erro ao editar o usuário, causa: ', JSON.stringify(error));
            console.log(error);
        }

    );



  }

  cancelarEditarUsuario(usuario: Usuario, indexTable: number) {


    usuario = this.listaUsuariosAntesDaEdicao[indexTable];

    usuario.preEditar = false;

    this.listaUsuarios[indexTable] = cloneDeep(usuario);

    this.dataSource = new MatTableDataSource <Usuario> (this.listaUsuarios);


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



