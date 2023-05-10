import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Aluno } from '../modelo/aluno';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})


export class AlunoService {

  private readonly baseUrl= 'https://api-laser-teste.herokuapp.com';
  private readonly apiUrl = `${this.baseUrl}/alunos`;

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  showMessage(msg: string): void {
    this.snackBar.open(msg, "X", {
      duration: 5000
    });
  }

  /* método para fazer o filtro
   essa interrogação é opcional, só é usada quando ela é chamada, se não for chamada irá listar todos os alunos
   a linha 33 em diante eu fiz essa lógica, porque eu renderizo na tela Masculino e Feminino
   e o back me retorna a string 'M' e 'F', caso o usuário não pesquisar por essas strings específicas
   vai filtrar os outros dados.
   */

  obterAlunos(filtro?: string): Observable<Aluno[]> {
    let params = new HttpParams();
    if (filtro) {
      if (filtro.toUpperCase() === 'FEMININO' || filtro.toUpperCase() === 'F') {
        params = params.append('sexo', 'F');
      } else if (filtro.toUpperCase() === 'MASCULINO' || filtro.toUpperCase() === 'M') {
        params = params.append('sexo', 'M');
      } else {
        params = params.append('q', filtro);
      }

    }

    return this.http.get<Aluno[]>(this.apiUrl, { params });
  }

  obterAlunoPorId(id: any): Observable<Aluno> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Aluno>(url);
  }

  adicionarAluno(aluno: Aluno): Observable<Aluno> {
    return this.http.post<Aluno>(this.apiUrl, aluno);
  }

  atualizarAluno(aluno: Aluno): Observable<Aluno> {
    const url = `${this.apiUrl}/${aluno.id}`;
    return this.http.put<Aluno>(url, aluno);
  }

  removerAluno(id: number): Observable<{}> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
