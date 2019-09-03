import { Tarefa } from './Tarefa';

export class Usuario {
    id: number;
    nome: string;
    sexoUsuarioEnum: string;
    listaTarefas: Array <Tarefa>;
}