import { Usuario } from './Usuario';

export class Tarefa {
    id: number;
    nome: string;
    usuario: Usuario;
    dataInicio: Date;
    dataFim: Date;
    statusTarefaEnum: string;
}