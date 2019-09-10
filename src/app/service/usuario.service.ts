import { Injectable } from '@angular/core';
import { Usuario } from '../model/Usuario';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  //enviarlistaUsuariosSubject: Subject<Array<Usuario>> = new Subject<Array<Usuario>>();

  enviarUsuarioSubject: Subject <Usuario> = new Subject <Usuario> ();

  /** 
  getEnviarlistaUsuariosSubjectObservable(): Observable <Array<Usuario>> {
      return this.enviarlistaUsuariosSubject.asObservable();
  }
  */
  getEnviarUsuarioSubject(): Observable <Usuario> {
      return this.enviarUsuarioSubject.asObservable();
  }

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

