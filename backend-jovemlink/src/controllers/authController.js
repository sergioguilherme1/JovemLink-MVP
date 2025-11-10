// src/controllers/authController.js
import { db } from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

/**
 * POST /auth/register
 */
export async function register(req, res) {
  try {
    const { nome, email, senha, tipo } = req.body;

    if (!nome || !email || !senha || !tipo) {
      return res.status(400).json({ error: "Campos obrigatórios ausentes" });
    }

    if (!["estudante", "empresa", "admin"].includes(tipo)) {
      return res.status(400).json({ error: "Tipo inválido" });
    }

    const [exists] = await db.query(
      "SELECT id_usuario FROM usuarios WHERE email = ?",
      [email]
    );

    if (exists.length) {
      return res.status(400).json({ error: "Email já cadastrado" });
    }

    const senha_hash = bcrypt.hashSync(senha, 10);

    const [result] = await db.query(
      "INSERT INTO usuarios (nome, email, senha_hash, tipo) VALUES (?, ?, ?, ?)",
      [nome, email, senha_hash, tipo]
    );

    return res.status(201).json({
      message: "Usuário criado",
      user: {
        id_usuario: result.insertId,
        nome,
        email,
        tipo
      }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro interno" });
  }
}

/**
 * POST /auth/login
 */
export async function login(req, res) {
  try {
    const { email, senha } = req.body;

    const [rows] = await db.query(
      "SELECT * FROM usuarios WHERE email = ?",
      [email]
    );

    if (!rows.length) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    const user = rows[0];
    const ok = bcrypt.compareSync(senha, user.senha_hash);

    if (!ok) {
      return res.status(401).json({ error: "Senha incorreta" });
    }

    const token = jwt.sign(
      {
        id_usuario: user.id_usuario,
        tipo: user.tipo,
        email: user.email
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.json({
      token,
      user: {
        id_usuario: user.id_usuario,
        nome: user.nome,
        email: user.email,
        tipo: user.tipo
      }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro interno" });
  }
}
