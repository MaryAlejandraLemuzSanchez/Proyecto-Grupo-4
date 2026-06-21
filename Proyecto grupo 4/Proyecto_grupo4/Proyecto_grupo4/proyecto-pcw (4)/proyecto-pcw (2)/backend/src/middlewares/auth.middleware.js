import jwt from "jsonwebtoken"

const SECRET_KEY = "tu_clave_secreta_aqui"

export const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1]

    if (!token) {
        return res.status(403).json({ res: "ACCESO DENEGADO: NO SE PROPORCIONÓ UN TOKEN" })
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY)
        req.usuario = decoded
        next()
    } catch (error) {
        return res.status(401).json({ res: "TOKEN INVÁLIDO O EXPIRADO" })
    }
}

export const isAdmin = (req, res, next) => {
    if (req.usuario && req.usuario.rol === "Administrador") {
        next()
    } else {
        return res.status(403).json({ res: "ACCESO RESTRINGIDO: SE REQUIERE ROL DE ADMINISTRADOR" })
    }
}
