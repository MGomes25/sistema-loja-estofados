export interface Column {
  field: string; // A chave do objeto de dados (ex: 'nome', 'preco')
  header: string; // O texto do cabeçalho da coluna (ex: 'Nome do Produto', 'Preço')
  type?: 'text' | 'currency' | 'number' | 'date'; // Tipo para formatação
  isActionColumn?: boolean; // Se esta coluna contém ações (botões)
}