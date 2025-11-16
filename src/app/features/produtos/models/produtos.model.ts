export interface Produto {
  id_produto?: number; 
  nome: string;
  descricao: string;
  id_categoria: number; 
  preco_venda: number;
  quantidade_estoque: number;
  
  
  preco_compra?: number;
  largura_cm?: number;
  altura_cm?: number;
  profundidade_cm?: number;
  peso_kg?: number;
  material?: string;
  cor?: string;
  id_fornecedor_principal?: number; 
  ativo?: boolean;
  data_cadastro?: Date;
}

export interface Categoria {
  id_categoria: number;
  nome: string;
  descricao?: string;
}

export interface Fornecedor {
  id_fornecedor: number;
  nome: string;
  cnpj?: string;
  contato?: string;
  telefone?: string;
  email?: string;
  endereco?: string;
  data_cadastro?: Date;
}