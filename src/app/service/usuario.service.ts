import { Injectable } from '@angular/core';
import { Usuario } from '../model/Usuario';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { cloneDeep } from 'lodash';
import { MatTableDataSource } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private enviarUsuarioSubject: Subject <Usuario> = new Subject <Usuario> ();

  constructor(private http: HttpClient) { }

  enviarUsuarioParaOutroComponente(usuario: Usuario) {
      this.enviarUsuarioSubject.next(JSON.parse(JSON.stringify(usuario)));
  }

  receberUsuarioDeOutroComponente(): Subject <Usuario> {
    return this.enviarUsuarioSubject;
  }

  escutarUsuarioDeOutroComponente(): Observable <Usuario> {
      return this.enviarUsuarioSubject.asObservable();
  }

  getUsuarios() {
      return this.http.get<Usuario[]>('http://localhost:8080/listatarefas/rest/usuario/listarUsuarios');
  }

  salvarUsuario(usuario: Usuario) {

      const headers =  new HttpHeaders().set('Content-Type', 'application/json');
      return this.http.post('http://localhost:8080/listatarefas/rest/usuario/salvarUsuario',  JSON.stringify(usuario), {headers});
  }

  alterarUsuario(usuario: Usuario) {
      // retira o atributo para enviar, pois não existe esse atributo no JSON do servidor
       delete usuario.preEditar;

       const headers =  new HttpHeaders().set('Content-Type', 'application/json');
       return this.http.put('http://localhost:8080/listatarefas/rest/usuario/alterarUsuario', JSON.stringify(usuario), {headers});
  }

  excluirUsuario(usuario: Usuario) {

      let parametros = new HttpParams();
      parametros = parametros.append('id', usuario.id.toString());
      return this.http.delete('http://localhost:8080/listatarefas/rest/usuario/excluirUsuario', {params: parametros});
  }

  editarUsuario(usuario: Usuario, indexTable: number, listaUsuarios: Array<Usuario>, listaUsuariosAntesDaEdicao: Array <Usuario>) {

    usuario.preEditar = true;

    listaUsuarios[indexTable] = usuario;

    // salva o dado ante de cnfirmar a edição, caso ele cancele a edição
    listaUsuariosAntesDaEdicao[indexTable] = cloneDeep(listaUsuarios[indexTable]);
  }


  confirmarEditarUsuario(usuario: Usuario, indexTable: number, dataSource: MatTableDataSource<Usuario>,
                         listaUsuarios: Usuario[], listaUsuariosAntesDaEdicao: Usuario[]) {

        usuario.preEditar = false;

        listaUsuarios[indexTable] = usuario;

        listaUsuariosAntesDaEdicao[indexTable] = listaUsuarios[indexTable];

        dataSource = new MatTableDataSource <Usuario> (listaUsuarios);
  }

  preencheListaComNovosAtributos(listaUsuarios: Usuario[]) {
      listaUsuarios.forEach((usuario) => {
          usuario.preEditar = false;
      });
  }
}

