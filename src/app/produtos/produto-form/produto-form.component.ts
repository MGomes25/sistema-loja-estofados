import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para diretivas como ngIf, ngFor
import { ActivatedRoute, Router } from '@angular/router'; // Para obter o ID e navegar
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // Reactive Forms
import { Produto, ProdutoService } from '../../services/produto.service'; // Seu serviço de produtos

@Component({
  selector: 'app-produto-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule // Importe ReactiveFormsModule para usar FormBuilder, FormGroup, etc.
  ],
  templateUrl: './produto-form.component.html',
  styleUrls: ['./produto-form.component.css']
})
export class ProdutoFormComponent implements OnInit {
  produtoForm: FormGroup;
  isEditMode: boolean = false;
  produtoId: string | null = null;

  constructor(
    private fb: FormBuilder, // Injeta o FormBuilder para construir o formulário
    private produtoService: ProdutoService,
    private router: Router,
    private route: ActivatedRoute // Para acessar os parâmetros da URL
  ) {
    // Inicializa o formulário com os campos e suas validações
    this.produtoForm = this.fb.group({
      id: [''], // ID para edição, será preenchido se for modo de edição
      nome: ['', Validators.required],
      tipo: ['', Validators.required],
      descricao: [''],
      preco: [0, [Validators.required, Validators.min(0.01)]],
      estoque: [0, [Validators.required, Validators.min(0)]],
      imagemUrl: [''],
      cor: [''],
      dimensoes: this.fb.group({ // Agrupando campos relacionados
        largura: [''],
        altura: [''],
        profundidade: ['']
      })
    });
  }

  ngOnInit(): void {
    // Verifica se estamos no modo de edição (se houver um ID na URL)
    this.route.paramMap.subscribe(params => {
      this.produtoId = params.get('id');
      if (this.produtoId) {
        this.isEditMode = true;
        this.loadProdutoForEdit(this.produtoId);
      }
    });
  }

  loadProdutoForEdit(id: string): void {
    this.produtoService.getProdutoById(id).subscribe({
      next: (produto) => {
        if (produto) {
          // Preenche o formulário com os dados do produto
          this.produtoForm.patchValue(produto);
          console.log('Produto carregado para edição:', produto);
        } else {
          console.warn('Produto não encontrado para edição:', id);
          this.router.navigate(['/produtos']); // Redireciona se o produto não for encontrado
        }
      },
      error: (err) => {
        console.error('Erro ao carregar produto para edição:', err);
        alert('Erro ao carregar produto. Verifique o console.');
        this.router.navigate(['/produtos']);
      }
    });
  }

  onSubmit(): void {
    if (this.produtoForm.valid) {
      const produto = this.produtoForm.value as Produto;
      if (this.isEditMode) {
        this.produtoService.updateProduto(produto).subscribe({
          next: (updatedProduto) => {
            if (updatedProduto) {
              alert('Produto atualizado com sucesso!');
              this.router.navigate(['/produtos']);
            } else {
              alert('Falha ao atualizar produto.');
            }
          },
          error: (err) => {
            console.error('Erro ao atualizar produto:', err);
            alert('Erro ao atualizar produto. Verifique o console.');
          }
        });
      } else {
        // Remove o ID para que o serviço possa gerar um novo
        delete produto.id;
        this.produtoService.addProduto(produto).subscribe({
          next: (newProduto) => {
            alert('Produto cadastrado com sucesso!');
            this.router.navigate(['/produtos']);
          },
          error: (err) => {
            console.error('Erro ao cadastrar produto:', err);
            alert('Erro ao cadastrar produto. Verifique o console.');
          }
        });
      }
    } else {
      alert('Por favor, preencha todos os campos obrigatórios corretamente.');
      this.markAllAsTouched(this.produtoForm); // Exibe os erros de validação
    }
  }

  onCancel(): void {
    this.router.navigate(['/produtos']); // Volta para a tela de listagem
  }

  // Método auxiliar para marcar todos os campos do formulário como 'touched'
  // o que força a exibição das mensagens de erro
  private markAllAsTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markAllAsTouched(control);
      }
    });
  }
}