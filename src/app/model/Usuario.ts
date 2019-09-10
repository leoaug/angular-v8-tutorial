import { Tarefa } from './Tarefa';
import { jsonIgnore } from 'json-ignore';


export class Usuario {
    id: number;
    nome: string;
    sexoUsuarioEnum: string;
    listaTarefas: Array <Tarefa>;

    @jsonIgnore()
    preEditar: boolean;
}