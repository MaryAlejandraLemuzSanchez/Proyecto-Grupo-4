import { Router } from "express"
import { getDashboardTotals, getLowStockProductos } from "../controllers/reportes.controller.js"

const router = Router()

router.get("/reportes/totales", getDashboardTotals)
router.get("/reportes/stock-bajo", getLowStockProductos)

export default router
