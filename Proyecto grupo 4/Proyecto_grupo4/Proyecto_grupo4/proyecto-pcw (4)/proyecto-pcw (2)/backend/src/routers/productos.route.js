import { Router } from "express"
import { getAllProductos, getOneProductos, saveProducto, updateProducto, deleteProducto } from "../controllers/productos.controller.js"

const router = Router() 



router.get("/productos/getall", getAllProductos)
router.get("/productos/getone/:id", getOneProductos)
router.post("/productos/save", saveProducto)
router.put("/productos/update/:id", updateProducto)
router.delete("/productos/delete/:id", deleteProducto)

export default router

