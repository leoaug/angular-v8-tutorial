import { Injectable } from '@angular/core';
import { Usuario } from '../model/Usuario';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  getUsuarios() {
      return this.http.get<Usuario[]>('http://localhost:8080/listatarefas/rest/usuario/listarUsuarios');
  }

  salvarUsuario(usuario: Usuario) {

      const headers =  new HttpHeaders().set('Content-Type', 'application/json');
      return this.http.post('http://localhost:8080/listatarefas/rest/usuario/salvarUsuario',  JSON.stringify(usuario), {headers});
  }

  excluirUsuario(usuario: Usuario) {

      let parametros = new HttpParams();
      parametros = parametros.append('id', usuario.id.toString());
      return this.http.delete('http://localhost:8080/listatarefas/rest/usuario/excluirUsuario', {params: parametros});
  }

}

