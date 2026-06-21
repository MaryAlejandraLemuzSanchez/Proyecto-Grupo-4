import express from "express";
import { PORT } from "./config.js";
import productosRoute from "./routers/productos.route.js";
import proveedoresRoutes from "./routers/proveedores.route.js";
import usuariosRoute from "./routers/usuarios.route.js";
import reportesRoutes from "./routers/reportes.route.js";
import ordenesRoutes from "./routers/ordenescompras.route.js";
import morgan from "morgan";
import cors from "cors";
const app = express();

app.use(cors())
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(productosRoute);
app.use(usuariosRoute);
app.use(proveedoresRoutes);
app.use(reportesRoutes);
app.use(ordenesRoutes);


app.listen(PORT, () => {
    console.log('Server is running on http://localhost:' + PORT);
});
