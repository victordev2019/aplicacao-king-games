import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { CadastroAlunoComponent } from './components/cadastro-aluno/cadastro-aluno.component';
import { AlunosComponent } from './components/alunos/alunos.component';
import { EditarAlunoComponent } from './components/editar-aluno/editar-aluno.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },

  { path: 'cadastro', component: CadastroAlunoComponent },
  { path: 'alunos', component: AlunosComponent },

  {
    path: 'alunos/editar/:id',
    component: EditarAlunoComponent

  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
