import { pool } from "../db.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const SECRET_KEY = "tu_clave_secreta_aqui"

export const loginUsuario = async (req, res) => {
    try {
        const { email, password } = req.body
        const [rows] = await pool.query("SELECT * FROM usuarios WHERE email = ?", [email])
        
        if (rows.length === 0) {
            return res.status(401).json({ res: "CORREO O CONTRASEÑA INCORRECTOS" })
        }

        const usuario = rows[0]
        const validPassword = await bcrypt.compare(password, usuario.password)
        
        if (!validPassword) {
            return res.status(401).json({ res: "CORREO O CONTRASEÑA INCORRECTOS" })
        }

        const token = jwt.sign(
            { id: usuario.id, rol: usuario.rol }, 
            SECRET_KEY, 
            { expiresIn: "8h" }
        )

        res.json({ res: "LOGIN CORRECTO", token, usuario: { id: usuario.id, nombre: usuario.nombre, rol: usuario.rol } })
    } catch (error) {
        console.log(error)
        res.status(500).json({ res: "ERROR EN EL SERVIDOR AL INICIAR SESIÓN" })
    }
}

export const getAllUsuarios = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT id, nombre, email, rol, fecha_creacion FROM usuarios")
        res.json(rows)
    } catch (error) {
        console.log(error)
        res.status(500).json({ res: "ERROR AL OBTENER USUARIOS" })
    }
}

export const getOneUsuarios = async (req, res) => {
    try {
        const id = req.params.id
        const [rows] = await pool.query("SELECT id, nombre, email, rol, fecha_creacion FROM usuarios WHERE id = ?", [id])
        if (rows.length === 0) return res.status(404).json({ res: "USUARIO NO ENCONTRADO" })
        res.json(rows[0])
    } catch (error) {
        console.log(error)
        res.status(500).json({ res: "ERROR AL OBTENER USUARIO" })
    }
}

export const saveUsuarios = async (req, res) => {
    try {
        const { nombre, email, password, rol } = req.body
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        await pool.query(
            "INSERT INTO usuarios (nombre, email, password, rol) VALUES(?, ?, ?, ?)",
            [nombre, email, hashedPassword, rol || "Empleado"]
        )
        res.status(201).json({ res: "USUARIO CREADO DE MANERA CORRECTA" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ res: "EL USUARIO NO HA SIDO CREADO" })
    }
}

export const updateUsuarios = async (req, res) => {
    try {
        const id = req.params.id
        const { nombre, email, password, rol } = req.body
        
        let query = "UPDATE usuarios SET nombre = ?, email = ?, rol = ? WHERE id = ?"
        let params = [nombre, email, rol, id]

        if (password) {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)
            query = "UPDATE usuarios SET nombre = ?, email = ?, password = ?, rol = ? WHERE id = ?"
            params = [nombre, email, hashedPassword, rol, id]
        }

        await pool.query(query, params)
        res.json({ res: "USUARIO ACTUALIZADO DE MANERA CORRECTA" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ res: "EL USUARIO NO HA SIDO ACTUALIZADO" })
    }
}

export const deleteUsuarios = async (req, res) => {
    try {
        const id = req.params.id
        await pool.query("DELETE FROM usuarios WHERE id = ?", [id])
        res.json({ res: "USUARIO ELIMINADO DE MANERA CORRECTA" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ res: "EL USUARIO NO HA SIDO ELIMINADO" })
    }
}
