import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import vagasRoutes from "./routes/vagasRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("API JovemLink Online ✅"));

app.use("/auth", authRoutes);
app.use("/vagas", vagasRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor online na porta ${PORT}`));
