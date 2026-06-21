import { pool } from "../db.js"

export const getAllProveedores = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT id, nombre, contacto, telefono, email, direccion FROM proveedores")
        res.json(rows)
    } catch (error) {
        console.log(error)
        res.status(500).json({res: "ERROR AL OBTENER LOS PROVEEDORES"})
    }
}

export const getOneProveedor = async (req, res) => {
    try {
        const id = req.params.id
        const [rows] = await pool.query("SELECT id, nombre, contacto, telefono, email, direccion FROM proveedores WHERE id = ?", [id])
        res.json(rows)
    } catch (error) {
        console.log(error)
        res.status(500).json({res: "ERROR AL OBTENER EL PROVEEDOR"})
    }
}

export const saveProveedor = async (req, res) => {
    try {
        const { nombre, contacto, telefono, email, direccion } = req.body
        await pool.query(
            "INSERT INTO proveedores (nombre, contacto, telefono, email, direccion) VALUES(?, ?, ?, ?, ?)",
            [nombre, contacto, telefono, email, direccion]
        )
        res.json({res: "PROVEEDOR CREADO DE MANERA CORRECTA"})
    } catch (error) {
        console.log(error)
        res.status(500).json({res: "EL PROVEEDOR NO HA SIDO CREADO"})
    }
}

export const updateProveedor = async (req, res) => {
    try {
        const id = req.params.id
        const { nombre, contacto, telefono, email, direccion } = req.body
        await pool.query(
            "UPDATE proveedores SET nombre = ?, contacto = ?, telefono = ?, email = ?, direccion = ? WHERE id = ?",
            [nombre, contacto, telefono, email, direccion, id]
        )
        res.json({res: "PROVEEDOR ACTUALIZADO DE MANERA CORRECTA"})
    } catch (error) {
        console.log(error)
        res.status(500).json({res: "EL PROVEEDOR NO HA SIDO ACTUALIZADO"})
    }
}

export const deleteProveedor = async (req, res) => {
    try {
        const id = req.params.id
        await pool.query("DELETE FROM proveedores WHERE id = ?", [id])
        res.json({res: "PROVEEDOR ELIMINADO DE MANERA CORRECTA"})
    } catch (error) {
        console.log(error)
        res.status(500).json({res: "EL PROVEEDOR NO HA SIDO ELIMINADO"})
    }
}
