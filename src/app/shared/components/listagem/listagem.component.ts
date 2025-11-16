import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Column } from '../../interfaces/column.interface'; // Ajuste o caminho conforme sua estrutura
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listagem',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.css']
})
export class ListagemComponent implements OnInit {
  @Input() data: any[] = []; // Os dados a serem listados (array de objetos)
  @Input() columns: Column[] = []; // Definição das colunas
  @Input() title: string = 'Listagem de Itens'; // Título da lista
  @Input() showActions: boolean = true; // Controla a visibilidade da coluna de ações

  @Output() itemSelected = new EventEmitter<any>(); // Emite o item selecionado para detalhes/edição
  @Output() itemDeleted = new new EventEmitter<any>(); // Emite o item a ser deletado
  @Output() itemAdded = new EventEmitter<void>(); // Emite quando o botão "Adicionar" é clicado

  constructor() { }

  ngOnInit(): void {
    if (!this.columns.length && this.data.length > 0) {
      // Se as colunas não forem definidas, tenta gerar automaticamente
      // pegando todas as chaves do primeiro objeto como colunas de texto
      this.columns = Object.keys(this.data[0]).map(key => ({
        field: key,
        header: this.capitalizeFirstLetter(key),
        type: 'text'
      }));
      // Adiciona coluna de ações se showActions for true
      if (this.showActions) {
        this.columns.push({ field: 'actions', header: 'Ações', isActionColumn: true });
      }
    }
  }

  onSelectItem(item: any): void {
    this.itemSelected.emit(item);
  }

  onDeleteItem(item: any): void {
    if (confirm('Tem certeza que deseja excluir este item?')) {
      this.itemDeleted.emit(item);
    }
  }

  onAddItem(): void {
    this.itemAdded.emit();
  }

  // Função auxiliar para capitalizar a primeira letra para os cabeçalhos automáticos
  private capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}