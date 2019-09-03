import { Injectable } from '@angular/core';
import { Usuario } from '../model/Usuario';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  getUsuarios() {
      return this.http.get<any[]>('http://localhost:8080/listatarefas/rest/usuario/listarUsuarios');
  }

  salvarUsuario(usuario: Usuario) {

    const headers =  new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post('http://localhost:8080/listatarefas/rest/usuario/salvarUsuario',  JSON.stringify(usuario), {headers});
  }

}

