import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Aluno } from 'src/app/modelo/aluno';
import { AlunoService } from 'src/app/service/aluno.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro-aluno.component.html',
  styleUrls: ['./cadastro-aluno.component.css']
})
export class CadastroAlunoComponent implements OnInit{

  formCadastro!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private alunoService: AlunoService,
    private router: Router
    ){}
  ngOnInit(): void {
    this.formCadastro = this.formBuilder.group({
      id: [''],
      nome: ['' , [ Validators.required]],
      sobrenome: ['' , [Validators.required]],
      idade: ['' , [Validators.required, Validators.min(0)]],
      sexo: ['' , [Validators.required]]
    });

  }

  /* Bloquea se o usuário digitar números ao invés de letra */
  habilitaSomenteLetra(event:KeyboardEvent){
    return event.charCode < 48 || event.charCode > 57;
  }

  cadastrarAluno() {
    const aluno: Aluno = this.formCadastro.value;
    this.alunoService.adicionarAluno(aluno).subscribe({
      next: (res) => {
        console.log('Aluno cadastrado com sucesso!', res);
        this.alunoService.showMessage('Aluno cadastrado com sucesso!');
        this.formCadastro.reset();
        this.router.navigate(['/alunos']);
      },
      error: (err) => {
        console.error('Erro ao cadastrar aluno: ', err);
        this.alunoService.showMessage('Erro ao cadastrar o aluno!');
      },
      complete: () => {
        console.log('Cadastro de aluno concluído!');
        this.router.navigate(['/alunos']);
      }
    });
  }

  habilitarBotao(): string {
    return this.formCadastro.valid ? 'botao' : 'botao-desabilitado';
   }
}
