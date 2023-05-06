import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, filter, map } from 'rxjs';
import { Aluno } from 'src/app/modelo/aluno';
import { AlunoService } from 'src/app/service/aluno.service';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css']
})
export class AlunosComponent implements OnInit{
  imagensAleatorias = [
    'assets/images/hogwarts-legacy.png',
    'assets/images/mario-bros.jpg',
    'assets/images/the-last-of-us.png',
    'assets/images/gta-5.jpg'
  ];
  imagemAleatoria: string = '';
  perfilMasculino: string = 'assets/images/deadpool.jpg';
  perfilFeminino: string = 'assets/images/ellie-1.jpg';
  alunos: Aluno[] = [];
  filtro = new FormControl();
  constructor(
    private alunoService: AlunoService
    ){
    }

  ngOnInit(): void {
    this.buscarAlunos();
    this.filtro.valueChanges
    .pipe(
      /* utlizei o debounce do RXJS para evitar que dispare muitas requições
      ao servidor, para evitar isso, a boa prática é aumentar o tempo
      e quando finalizar esse tempo ele busca no servidor
      */
      debounceTime(500),
      /* esse filter eu fiz para verificar  se o usuario vai digitar maior ou igual a 2 digitos
      com isso, evita fazer busca de vários dados, quando digita apenas uma letra por exemplo
      já esse  trim().length, quando os espaços da string for 0 ele volta a listar todos os alunos.
      */
      filter((value: string) => value.trim().length === 0 || value.length >= 2),
    )
    .subscribe(() => {
      this.buscarAlunos();
    });
    this.imagemAleatoria = this.getJogos();
  }

  /* Essa função cria imagens aleatórias
   <!--Como não recebo do backas imagens,
        eu fiz isso para ficar dinâmico para o usuário.
            -->
  */

  getJogos(): string {
    return this.imagensAleatorias[Math.floor(Math.random() * this.imagensAleatorias.length)];
  }
  buscarAlunos(): void {
    this.alunoService.obterAlunos(this.filtro.value)
      .subscribe({
        next: (alunos: Aluno[]) => {
          this.alunos = alunos;
          /* Como o back me retorna string M e F, para ficar
          confortável e fácil de entender para o usuário eu renderizo
          na tela Mssculino e Feminino */
          this.alunos.forEach(aluno => {
            aluno.sexo = aluno.sexo === 'M' ? 'Masculino' : 'Feminino';

          });

        },
        error: (error) => {
          console.log('Erro ao obter lista de alunos: ', error);
        },
        complete: () => {
          console.log('Obtenção de lista de alunos concluída!');
        }
      });


  }

  removerAluno(id:number): void {
    this.alunoService.removerAluno(id)
    .subscribe({
      next: () => {
        this.alunos = this.alunos.filter(aluno => aluno.id !== id);
        this.alunoService.showMessage('Aluno excluído com sucesso!');
        console.log(`Aluno com id ${id} removido com sucesso`);
      },
      error: (error) => {
        console.log('Erro ao remover o aluno: ', error);
        this.alunoService.showMessage('Erro ao excluir o aluno!');
      },
      complete: () => {
        console.log('Remoção do aluno concluída!');
      }
    });

    }


}
