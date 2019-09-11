import { Injectable } from '@angular/core';
import { Tarefa } from '../model/Tarefa';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {

  constructor(private http: HttpClient) { }

  salvarTarefa(tarefa: Tarefa) {

      const headers =  new HttpHeaders().set('Content-Type', 'application/json');
      return this.http.post('http://localhost:8080/listatarefas/rest/tarefa/salvarTarefa',  JSON.stringify(tarefa), {headers});
  }
}
