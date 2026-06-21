import { pool } from "../db.js"

export const getAllProductos = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT id, codigo, nombre, descripcion, precio, stock_actual, stock_minimo, categoria, imagen_url FROM productos")
        res.json(rows)
    } catch (error) {
        console.log(error)
        res.status(500).json({res: "ERROR AL OBTENER LOS PRODUCTOS"})
    }
}

export const getOneProductos = async (req, res) => {
    try {
        const id = req.params.id
        const [rows] = await pool.query("SELECT id, codigo, nombre, descripcion, precio, stock_actual, stock_minimo, categoria, imagen_url FROM productos WHERE id = ?", [id])
        res.json(rows)
    } catch (error) {
        console.log(error)
        res.status(500).json({res: "ERROR AL OBTENER EL PRODUCTO"})
    }
}

export const saveProducto = async (req, res) => {
    try {
        const { codigo, nombre, descripcion, precio, stock_actual, stock_minimo, categoria, imagen_url } = req.body
        await pool.query(
            "INSERT INTO productos (codigo, nombre, descripcion, precio, stock_actual, stock_minimo, categoria, imagen_url) VALUES(?, ?, ?, ?, ?, ?, ?, ?)",
            [codigo, nombre, descripcion, precio, stock_actual, stock_minimo, categoria, imagen_url]
        )
        res.json({res: "PRODUCTO CREADO DE MANERA CORRECTA"})
    } catch (error) {
        console.log(error)
        res.status(500).json({res: "EL PRODUCTO NO HA SIDO CREADO"})
    }
}

export const updateProducto = async (req, res) => {
    try {
        const id = req.params.id
        const { codigo, nombre, descripcion, precio, stock_actual, stock_minimo, categoria, imagen_url } = req.body
        await pool.query(
            "UPDATE productos SET codigo = ?, nombre = ?, descripcion = ?, precio = ?, stock_actual = ?, stock_minimo = ?, categoria = ?, imagen_url = ? WHERE id = ?",
            [codigo, nombre, descripcion, precio, stock_actual, stock_minimo, categoria, imagen_url, id]
        )
        res.json({res: "PRODUCTO ACTUALIZADO DE MANERA CORRECTA"})
    } catch (error) {
        console.log(error)
        res.status(500).json({res: "EL PRODUCTO NO HA SIDO ACTUALIZADO"})
    }
}

export const deleteProducto = async (req, res) => {
    try {
        const id = req.params.id
        await pool.query("DELETE FROM productos WHERE id = ?", [id])
        res.json({res: "PRODUCTO ELIMINADO DE MANERA CORRECTA"})
    } catch (error) {
        console.log(error)
        res.status(500).json({res: "EL PRODUCTO NO HA SIDO ELIMINADO"})
    }
}
