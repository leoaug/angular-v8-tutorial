import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalvarUsuarioComponent } from './salvar-usuario/salvar-usuario.component';
import { AlterarUsuarioComponent } from './alterar-usuario/alterar-usuario.component';
import { ListarUsuarioComponent } from './listar-usuario/listar-usuario.component';


const routes: Routes = [
  {
    path: "criarUsuario",
    component:SalvarUsuarioComponent
  },
  {
    path: "criarTarefa",
    component: AlterarUsuarioComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
