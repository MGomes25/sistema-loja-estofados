import { Routes } from '@angular/router';
// Importe o ProdutosComponent. Certifique-se que o caminho está correto
import { ProdutosComponent } from './produtos/produtos.component';
// Importe o ProdutoFormComponent. Certifique-se que o caminho está correto
import { ProdutoFormComponent } from './produtos/produto-form/produto-form.component';

export const routes: Routes = [
  // Rota padrão: quando a URL é a raiz ('/'), redireciona para '/produtos'
  { path: '', redirectTo: 'produtos', pathMatch: 'full' },

  // Rota para a listagem de produtos
  // Quando a URL é '/produtos', exibe o ProdutosComponent
  { path: 'produtos', component: ProdutosComponent },

  // Rota para o formulário de adicionar novo produto
  // Quando a URL é '/produtos/new', exibe o ProdutoFormComponent (modo de adição)
  { path: 'produtos/new', component: ProdutoFormComponent },

  // Rota para o formulário de editar um produto existente
  // Quando a URL é '/produtos/:id/edit', exibe o ProdutoFormComponent (modo de edição)
  // O ':id' é um parâmetro da rota que será usado para carregar o produto
  { path: 'produtos/:id/edit', component: ProdutoFormComponent },

  // Rota curinga: se nenhuma das rotas anteriores corresponder, redireciona para '/produtos'
  { path: '**', redirectTo: 'produtos' }
];