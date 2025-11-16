import { Component, OnInit } from '@angular/core';
import { ListagemComponent } from '../shared/components/listagem/listagem.component';
import { Produto, ProdutoService } from '../services/produto.service';
import { Column } from '../shared/interfaces/column.interface';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // <-- Garanta que Router está importado

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [
    CommonModule,
    ListagemComponent
  ],
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {
  produtos: Produto[] = [];
  produtoColumns: Column[] = [
    { field: 'id', header: 'ID' },
    { field: 'nome', header: 'Nome do Produto' },
    { field: 'tipo', header: 'Tipo' },
    { field: 'preco', header: 'Preço', type: 'currency' },
    { field: 'estoque', header: 'Estoque', type: 'number' },
    { field: 'cor', header: 'Cor' },
    { field: 'actions', header: 'Ações', isActionColumn: true }
  ];

  constructor(
    private produtoService: ProdutoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadProdutos();
  }

  loadProdutos(): void {
    this.produtoService.getProdutos().subscribe({
      next: (data) => {
        this.produtos = data;
        console.log('Produtos carregados para exibição:', this.produtos);
      },
      error: (err) => {
        console.error('Erro ao carregar produtos:', err);
      }
    });
  }

  onProdutoSelected(produto: Produto): void {
    console.log('Ver/Editar Produto:', produto);
    this.router.navigate(['/produtos', produto.id, 'edit']); // <-- NAVEGAÇÃO PARA EDIÇÃO
  }

  onProdutoDeleted(produto: Produto): void {
    console.log('Deletar Produto:', produto);
    if (confirm(`Tem certeza que deseja excluir o produto '${produto.nome}'?`)) {
      this.produtoService.deleteProduto(produto.id).subscribe({
        next: (success) => {
          if (success) {
            alert(`Produto '${produto.nome}' deletado com sucesso!`);
            this.loadProdutos();
          } else {
            alert(`Erro ao deletar produto '${produto.nome}'.`);
          }
        },
        error: (err) => {
          console.error('Erro ao deletar produto:', err);
          alert(`Ocorreu um erro ao tentar deletar o produto '${produto.nome}'.`);
        }
      });
    }
  }

  onAddProduto(): void {
    console.log('Adicionar Novo Produto');
    this.router.navigate(['/produtos/new']); // <-- NAVEGAÇÃO PARA CRIAÇÃO
  }
}