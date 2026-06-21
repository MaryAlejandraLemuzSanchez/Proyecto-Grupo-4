import { Router } from "express"
import { getAllUsuarios, getOneUsuarios, saveUsuarios, updateUsuarios, deleteUsuarios, loginUsuario } from "../controllers/usuarios.controller.js"
import { verifyToken, isAdmin } from "../middlewares/auth.middleware.js"

const router = Router()

router.post("/usuarios/login", loginUsuario)

router.get("/usuarios/getall", verifyToken, getAllUsuarios)
router.get("/usuarios/getone/:id", verifyToken, getOneUsuarios)
router.post("/usuarios/save", saveUsuarios)
router.put("/usuarios/update/:id", verifyToken, isAdmin, updateUsuarios)
router.delete("/usuarios/delete/:id", verifyToken, isAdmin, deleteUsuarios)

export default router
