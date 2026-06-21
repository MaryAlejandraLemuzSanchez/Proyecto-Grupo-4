import { pool } from "../db.js"

export const getDashboardTotals = async (req, res) => {
    try {
        const [productosCount] = await pool.query("SELECT COUNT(*) AS total FROM productos")
        const [proveedoresCount] = await pool.query("SELECT COUNT(*) AS total FROM proveedores")
        const [ordenesCount] = await pool.query("SELECT COUNT(*) AS total FROM ordenes_compra")

        res.json({
            totales: {
                productos: productosCount[0].total,
                proveedores: proveedoresCount[0].total,
                ordenes: ordenesCount[0].total
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ res: "ERROR AL OBTENER LOS TOTALES DEL DASHBOARD" })
    }
}

export const getLowStockProductos = async (req, res) => {
    try {
        const [rows] = await pool.query(
            "SELECT id, codigo, nombre, stock_actual, stock_minimo, categoria FROM productos WHERE stock_actual <= stock_minimo"
        )
        res.json(rows)
    } catch (error) {
        console.log(error)
        res.status(500).json({ res: "ERROR AL OBTENER LOS PRODUCTOS CON STOCK BAJO" })
    }
}
