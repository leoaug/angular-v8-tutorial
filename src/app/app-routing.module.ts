import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalvarUsuarioComponent } from './salvar-usuario/salvar-usuario.component';
import { AlterarUsuarioComponent } from './alterar-usuario/alterar-usuario.component';
import { ListarUsuarioComponent } from './listar-usuario/listar-usuario.component';


const routes: Routes = [
  {
    path: "usuario/salvarUsuario",
    component:SalvarUsuarioComponent
  },
  {
    path: "usuario/alterarUsuario",
    component: AlterarUsuarioComponent
  },
  {
    path: "usuario/listarUsuarios",
    component:ListarUsuarioComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
