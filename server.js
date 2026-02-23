const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Configuração do banco de dados
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'sua_senha',
    database: 'restaurante_db'
};

// Pool de conexões
const pool = mysql.createPool(dbConfig);

// Rotas

// GET /api/produtos
app.get('/api/produtos', async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM produtos WHERE ativo = true ORDER BY nome'
        );
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/produtos/:id
app.get('/api/produtos/:id', async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM produtos WHERE id = ?',
            [req.params.id]
        );
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /api/comandas
app.post('/api/comandas', async (req, res) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        
        const { itens, subtotal, desconto, taxa_garcom, total, pessoas } = req.body;
        
        // Inserir comanda
        const [comandaResult] = await connection.query(
            'INSERT INTO comandas (subtotal, desconto, taxa_garcom, total, pessoas) VALUES (?, ?, ?, ?, ?)',
            [subtotal, desconto, taxa_garcom, total, pessoas]
        );
        
        const comandaId = comandaResult.insertId;
        
        // Inserir itens
        for (const item of itens) {
            await connection.query(
                'INSERT INTO comanda_itens (comanda_id, produto_id, quantidade, preco_unitario, subtotal) VALUES (?, ?, ?, ?, ?)',
                [comandaId, item.id, item.quantity, item.preco, item.preco * item.quantity]
            );
        }
        
        await connection.commit();
        
        res.status(201).json({ 
            id: comandaId, 
            message: 'Comanda finalizada com sucesso' 
        });
        
    } catch (error) {
        await connection.rollback();
        res.status(500).json({ error: error.message });
    } finally {
        connection.release();
    }
});

// GET /api/comandas
app.get('/api/comandas', async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT c.*, 
                   COUNT(ci.id) as total_itens
            FROM comandas c
            LEFT JOIN comanda_itens ci ON c.id = ci.comanda_id
            GROUP BY c.id
            ORDER BY c.created_at DESC
            LIMIT 50
        `);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/comandas/:id
app.get('/api/comandas/:id', async (req, res) => {
    try {
        const [comanda] = await pool.query(
            'SELECT * FROM comandas WHERE id = ?',
            [req.params.id]
        );
        
        if (comanda.length === 0) {
            return res.status(404).json({ error: 'Comanda não encontrada' });
        }
        
        const [itens] = await pool.query(`
            SELECT ci.*, p.nome, p.imagem_url
            FROM comanda_itens ci
            JOIN produtos p ON ci.produto_id = p.id
            WHERE ci.comanda_id = ?
        `, [req.params.id]);
        
        res.json({
            ...comanda[0],
            itens
        });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});