import { Router } from "express";
import { listarVagas, criarVaga } from "../controllers/vagasController.js";

const router = Router();

router.get("/", listarVagas);
router.post("/", criarVaga);

export default router;
