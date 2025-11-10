import { db } from "../config/db.js";

export async function criarVaga(req, res) {
  try {
    const { titulo, descricao, id_usuario } = req.body;

    if (!titulo || !descricao || !id_usuario) {
      return res.status(400).json({ error: "Dados incompletos" });
    }

    const [result] = await db.query(
      "INSERT INTO vagas (titulo, descricao, id_usuario) VALUES (?, ?, ?)",
      [titulo, descricao, id_usuario]
    );

    res.json({ id_vaga: result.insertId, message: "Vaga criada!" });
  } catch (err) {
    console.error("ERRO criarVaga =>", err);
    res.status(500).json({ error: "Erro ao criar vaga" });
  }
}

export async function listarVagas(req, res) {
  try {
    const [rows] = await db.query(`
      SELECT v.*, u.nome as empresa
      FROM vagas v
      JOIN usuarios u ON v.id_usuario = u.id_usuario
    `);

    res.json(rows);
  } catch (err) {
    console.error("ERRO listarVagas =>", err);
    res.status(500).json({ error: "Erro ao listar vagas" });
  }
}
