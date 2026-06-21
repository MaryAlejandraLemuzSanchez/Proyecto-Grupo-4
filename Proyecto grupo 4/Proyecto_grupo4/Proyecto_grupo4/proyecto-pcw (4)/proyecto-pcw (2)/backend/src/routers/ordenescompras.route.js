import { Router } from "express"
import { createOrdenCompra, getOrdenes, updateEstadoOrden } from "../controllers/ordenescompras.controller.js"

const router = Router()

router.post("/ordenes/save", createOrdenCompra)
router.get("/ordenes/getall", getOrdenes)
router.put("/ordenes/update-estado/:id", updateEstadoOrden)

export default router
