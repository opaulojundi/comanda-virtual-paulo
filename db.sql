-- Criação do banco de dados
CREATE DATABASE IF NOT EXISTS restaurante_db;
USE restaurante_db;

-- Tabela de produtos
CREATE TABLE produtos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10,2) NOT NULL,
    imagem_url VARCHAR(500),
    ativo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de comandas
CREATE TABLE comandas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    subtotal DECIMAL(10,2) NOT NULL,
    desconto DECIMAL(10,2) DEFAULT 0,
    taxa_garcom DECIMAL(10,2) DEFAULT 0,
    total DECIMAL(10,2) NOT NULL,
    pessoas INT DEFAULT 1,
    status ENUM('aberta', 'finalizada', 'cancelada') DEFAULT 'finalizada',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de itens da comanda
CREATE TABLE comanda_itens (
    id INT PRIMARY KEY AUTO_INCREMENT,
    comanda_id INT NOT NULL,
    produto_id INT NOT NULL,
    quantidade INT NOT NULL,
    preco_unitario DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (comanda_id) REFERENCES comandas(id),
    FOREIGN KEY (produto_id) REFERENCES produtos(id)
);

-- Inserir produtos de exemplo
INSERT INTO produtos (nome, descricao, preco) VALUES
('Risoto de Cogumelos', 'Arroz cremoso com cogumelos frescos', 42.90),
('Bife Ancho', 'Bife ancho grelhado com chimichurri', 68.50),
('Salada Caprese', 'Mozzarella, tomate e manjericão', 32.90),
('Massas ao Pesto', 'Fettuccine com molho pesto', 38.90),
('Bruschetta', 'Pão tostado com tomate e manjericão', 24.90),
('Tiramisù', 'Sobremesa italiana clássica', 22.90),
('Carpaccio', 'Finas fatias de carne com rúcula', 45.90),
('Polvo à Lagareiro', 'Polvo assado com batatas', 89.90);

-- Índices para melhor performance
CREATE INDEX idx_produtos_ativo ON produtos(ativo);
CREATE INDEX idx_comandas_data ON comandas(created_at);
CREATE INDEX idx_comandas_status ON comandas(status);