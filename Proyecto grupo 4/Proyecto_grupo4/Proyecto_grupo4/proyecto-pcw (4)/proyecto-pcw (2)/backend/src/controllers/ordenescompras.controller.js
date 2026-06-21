import { pool } from "../db.js"

export const createOrdenCompra = async (req, res) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const { proveedor_id, estado, productos } = req.body; 
        const total = productos.reduce((sum, item) => sum + (item.cantidad * item.precio_unitario), 0);

        const [ordenResult] = await connection.query(
            "INSERT INTO ordenes_compra (proveedor_id, estado, total) VALUES (?, ?, ?)",
            [proveedor_id, estado || 'Pendiente', total]
        );
        
        const ordenId = ordenResult.insertId;

        for (const prod of productos) {
            await connection.query(
                "INSERT INTO detalle_ordenes (orden_id, producto_id, cantidad, precio_unitario) VALUES (?, ?, ?, ?)",
                [ordenId, prod.producto_id, prod.cantidad, prod.precio_unitario]
            );

            if (estado === 'Completado') {
                await connection.query(
                    "UPDATE productos SET stock_actual = stock_actual + ? WHERE id = ?",
                    [prod.cantidad, prod.producto_id]
                );
            }
        }

        await connection.commit();
        res.status(201).json({ res: "ÓRDEN DE COMPRA Y DETALLES CREADOS CORRECTAMENTE", orden_id: ordenId });

    } catch (error) {
        await connection.rollback();
        console.log(error);
        res.status(500).json({ res: "ERROR AL CREAR LA ÓRDEN DE COMPRA" });
    } finally {
        connection.release();
    }
};

export const getOrdenes = async (req, res) => {
    try {
        const { estado } = req.query;
        let sql = "SELECT * FROM ordenes_compra";
        const params = [];

        if (estado) {
            sql += " WHERE estado = ?";
            params.push(estado);
        }

        const [rows] = await pool.query(sql, params);
        res.json(rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({ res: "ERROR AL OBTENER LAS ÓRDENES" });
    }
};

export const updateEstadoOrden = async (req, res) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const { id } = req.params;
        const { nuevo_estado } = req.body;

        const [ordenes] = await connection.query("SELECT estado FROM ordenes_compra WHERE id = ?", [id]);
        if (ordenes.length === 0) {
            return res.status(404).json({ res: "Órden no encontrada" });
        }
        const estadoAnterior = ordenes[0].estado;

        await connection.query("UPDATE ordenes_compra SET estado = ? WHERE id = ?", [nuevo_estado, id]);

        if (estadoAnterior !== 'Completado' && nuevo_estado === 'Completado') {
            const [detalles] = await connection.query("SELECT producto_id, cantidad FROM detalle_ordenes WHERE orden_id = ?", [id]);
            
            for (const item of detalles) {
                await connection.query(
                    "UPDATE productos SET stock_actual = stock_actual + ? WHERE id = ?",
                    [item.cantidad, item.producto_id]
                );
            }
        }
        else if (estadoAnterior === 'Completado' && nuevo_estado === 'Cancelado') {
            const [detalles] = await connection.query("SELECT producto_id, cantidad FROM detalle_ordenes WHERE orden_id = ?", [id]);
            
            for (const item of detalles) {
                await connection.query(
                    "UPDATE productos SET stock_actual = stock_actual - ? WHERE id = ?",
                    [item.cantidad, item.producto_id]
                );
            }
        }

        await connection.commit();
        res.json({ res: `ESTADO DE ÓRDEN ACTUALIZADO A ${nuevo_estado} Y STOCK MODIFICADO` });

    } catch (error) {
        await connection.rollback();
        console.log(error);
        res.status(500).json({ res: "ERROR AL CAMBIAR EL ESTADO DE LA ÓRDEN" });
    } finally {
        connection.release();
    }
};
