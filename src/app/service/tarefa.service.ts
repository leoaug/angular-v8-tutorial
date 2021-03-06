import { Injectable } from '@angular/core';
import { Tarefa } from '../model/Tarefa';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {

  constructor(private http: HttpClient) { }

  private enviarUsuarioSubject: Subject <Tarefa> = new Subject <Tarefa> ();

  enviarTarefaParaOutroComponente(tarefa: Tarefa) {
      this.enviarUsuarioSubject.next(JSON.parse(JSON.stringify(tarefa)));
  }

  receberTarefaDeOutroComponente(): Subject <Tarefa> {
    return this.enviarUsuarioSubject;
  }

  escutarTarefaDeOutroComponente(): Observable <Tarefa> {
      return this.enviarUsuarioSubject.asObservable();
  }

  getTarefas() {
      return this.http.get<Tarefa[]>('http://localhost:8080/listatarefas/rest/tarefa/listarTarefas');
  }

  salvarTarefa(tarefa: Tarefa) {

      const headers =  new HttpHeaders().set('Content-Type', 'application/json');
      return this.http.post('http://localhost:8080/listatarefas/rest/tarefa/salvarTarefa',  JSON.stringify(tarefa), {headers});
  }
}
