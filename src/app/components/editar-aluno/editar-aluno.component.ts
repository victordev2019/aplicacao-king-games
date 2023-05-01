import { Component, Input,  OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Aluno } from 'src/app/modelo/aluno';
import { AlunoService } from 'src/app/service/aluno.service';

@Component({
  selector: 'app-editar-aluno',
  templateUrl: './editar-aluno.component.html',
  styleUrls: ['./editar-aluno.component.css']
})
export class EditarAlunoComponent implements OnInit{


  formEdicao!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private alunoService: AlunoService,
    private router: Router,
    private route: ActivatedRoute
  ){}
  ngOnInit(): void {

    this.formEdicao = this.formBuilder.group({
      id: [''],
      nome: ['', [Validators.required]],
      sobrenome: ['', [Validators.required]],
      idade: ['', [Validators.required, Validators.min(0)]],
      sexo: ['', [Validators.required]]
    });
    const id = this.route.snapshot.paramMap.get('id');
    this.alunoService.obterAlunoPorId(id).subscribe(aluno => {
    this.formEdicao.patchValue(aluno);
  });

  }

  editarAluno() {
    const aluno: Aluno = this.formEdicao.value;
    this.alunoService.atualizarAluno(aluno).subscribe({
      next: (res) => {
        console.log('Aluno editado com sucesso!', res);
        this.alunoService.showMessage('Aluno editado com sucesso!');
      },
      error: (err) => {
        console.error('Erro ao editar aluno: ', err);
        this.alunoService.showMessage('Erro ao editar o aluno!');
      },
      complete: () => {
        console.log('Edição de aluno concluída!');
        this.router.navigate(['/alunos']);
      }
    });

}

/* Bloquea se o usuário digitar números ao invés de letra */
habilitaSomenteLetra(event:KeyboardEvent){
  return event.charCode < 48 || event.charCode > 57;
}

habilitarBotao(): string {
  return this.formEdicao.valid ? 'botao' : 'botao-desabilitado';
 }
}
