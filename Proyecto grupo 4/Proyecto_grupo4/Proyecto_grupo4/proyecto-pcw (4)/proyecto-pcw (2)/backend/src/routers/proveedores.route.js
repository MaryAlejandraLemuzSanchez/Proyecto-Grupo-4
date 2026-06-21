import { Router } from "express"
import { getAllProveedores, getOneProveedor, saveProveedor, updateProveedor, deleteProveedor } from "../controllers/proveedores.controller.js"

const router = Router()

router.get("/proveedores/getall", getAllProveedores)
router.get("/proveedores/getone/:id", getOneProveedor)
router.post("/proveedores/save", saveProveedor)
router.put("/proveedores/update/:id", updateProveedor)
router.delete("/proveedores/delete/:id", deleteProveedor)

export default router
