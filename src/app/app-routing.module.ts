import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalvarUsuarioComponent } from './salvar-usuario/salvar-usuario.component';
import { SalvarTarefaComponent } from './salvar-tarefa/salvar-tarefa.component';


const routes: Routes = [
  {
    path: "criarUsuario",
    component:SalvarUsuarioComponent
  },
  {
    path: "criarTarefa",
    component: SalvarTarefaComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
