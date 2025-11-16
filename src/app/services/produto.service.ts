import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface Produto {
  id?: string;
  nome: string;
  tipo: string;
  descricao: string;
  preco: number;
  estoque: number;
  imagemUrl: string;
  cor: string;
  dimensoes: { largura: string; altura: string; profundidade: string };
}

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private produtos: Produto[] = []; // Para simular um "banco de dados" em memória

  constructor(private http: HttpClient) {
    // Carrega os dados mockados uma vez ao iniciar o serviço
    this.http.get<Produto[]>('assets/mock-data/produtos.json').subscribe(data => {
      this.produtos = data;
    });
  }

  getProdutos(): Observable<Produto[]> {
    // Simula um atraso de rede
    return of(this.produtos).pipe(delay(500));
  }

  getProdutoById(id: string): Observable<Produto | undefined> {
    return of(this.produtos.find(p => p.id === id)).pipe(delay(300));
  }

  addProduto(produto: Produto): Observable<Produto> {
    produto.id = `prod${this.produtos.length + 1}`; // Gerar um ID simples
    this.produtos.push(produto);
    return of(produto).pipe(delay(300));
  }

  updateProduto(produtoAtualizado: Produto): Observable<Produto | undefined> {
    const index = this.produtos.findIndex(p => p.id === produtoAtualizado.id);
    if (index > -1) {
      this.produtos[index] = produtoAtualizado;
      return of(produtoAtualizado).pipe(delay(300));
    }
    return of(undefined).pipe(delay(300));
  }

  deleteProduto(id?: string): Observable<boolean> {
    const initialLength = this.produtos.length;
    this.produtos = this.produtos.filter(p => p.id !== id);
    return of(this.produtos.length < initialLength).pipe(delay(300));
  }
}