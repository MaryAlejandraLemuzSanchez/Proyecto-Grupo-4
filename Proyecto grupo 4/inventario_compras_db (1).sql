-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-06-2026 a las 05:29:19
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `inventario_compras_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_ordenes`
--

CREATE TABLE `detalle_ordenes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `orden_id` int(11) DEFAULT NULL,
  `producto_id` int(11) DEFAULT NULL,
  `cantidad` int(11) NOT NULL CHECK (`cantidad` > 0),
  `precio_unitario` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `detalle_ordenes`
--

INSERT INTO `detalle_ordenes` (`id`, `orden_id`, `producto_id`, `cantidad`, `precio_unitario`) VALUES
(1, 1, 1, 45, 12.50),
(2, 2, 2, 3, 65.00),
(3, 3, 4, 315, 3.80),
(4, 4, 3, 90, 4.20),
(5, 5, 5, 5, 48.00),
(6, 6, 6, 7, 500.00),
(7, 7, 34, 243, 2322.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ordenes_compra`
--

CREATE TABLE `ordenes_compra` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `proveedor_id` bigint(20) UNSIGNED NOT NULL,
  `estado` varchar(50) NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `fecha_orden` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ordenes_compra`
--

INSERT INTO `ordenes_compra` (`id`, `proveedor_id`, `estado`, `total`, `fecha_orden`) VALUES
(1, 1, 'En Proceso', 562.50, '2026-06-17 04:52:30'),
(2, 3, 'Pendiente', 195.00, '2026-06-17 04:52:30'),
(3, 2, 'En Proceso', 1200.00, '2026-06-17 04:52:30'),
(4, 4, 'Completado', 380.00, '2026-06-17 04:52:30'),
(5, 5, 'Cancelado', 240.00, '2026-06-17 04:52:30'),
(6, 6, 'Cancelado', 3500.00, '2026-06-18 20:18:54'),
(7, 3, 'Completado', 564246.00, '2026-06-19 03:07:23');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `codigo` varchar(50) NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `precio` decimal(10,2) NOT NULL DEFAULT 0.00,
  `stock_actual` int(11) NOT NULL DEFAULT 0,
  `stock_minimo` int(11) NOT NULL DEFAULT 5,
  `categoria` varchar(100) DEFAULT NULL,
  `imagen_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `codigo`, `nombre`, `descripcion`, `precio`, `stock_actual`, `stock_minimo`, `categoria`, `imagen_url`) VALUES
(1, 'FERR-001', 'Martillo de Uña 16 oz', 'Martillo con mango de fibra de vidrio anti-vibración', 12.50, 90, 10, 'Herramientas Manuales', 'imagenes/martillo.jpg'),
(2, 'FERR-002', 'Taladro Rotomartillo 1/2', 'Taladro eléctrico de 550W con velocidad variable', 65.00, 2, 3, 'Herramientas Eléctricas', 'imagenes/taladro.jpg'),
(3, 'FERR-003', 'Cinta Métrica 5 metros', 'Cinta de impacto con seguro y clip para cinturón', 4.20, 80, 15, 'Medición', 'imagenes/cinta.jpg'),
(4, 'FERR-004', 'Caja de Clavos de 2 pulgadas', 'Caja de 1 kg de clavos para madera con cabeza', 3.80, 100, 20, 'Fijaciones', 'imagenes/clavos.jpg'),
(5, 'FERR-005', 'Pintura Vinílica Blanca 19L', 'Cubeta de pintura plástica lavable para interiores', 48.00, 1, 4, 'Pinturas', 'imagenes/pintura_blanca.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedores`
--

CREATE TABLE `proveedores` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `contacto` varchar(100) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `direccion` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `proveedores`
--

INSERT INTO `proveedores` (`id`, `nombre`, `contacto`, `telefono`, `email`, `direccion`) VALUES
(1, 'Distribuidora Industrial Truper', 'Manuel Gómez', '555-011', 'ventas@truper.com', 'Zona Industrial Norte, Bodega 4'),
(2, 'Aceros y Perfiles del Centro', 'Sofía Castro', '555-0222', 'contacto@aceroscentro.com', 'Av. Ferrocarril KM 12'),
(3, 'Herramientas Stanley S.A.', 'Jorge Rojas', '555-0333', 'jrojas@stanley.com', 'Parque Tecnológico Industrial 45'),
(4, 'Cementos y Agregados Progreso', 'Laura Méndez', '555-0444', 'pedidos@progreso.com', 'Calle de la Cantera 78'),
(5, 'Pinturas y Acabados Berel', 'Ricardo Luna', '555-0555', 'rluna@berel.com', 'Blvd. de los Colores 1010');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `rol` varchar(20) NOT NULL DEFAULT 'Empleado',
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `email`, `password`, `rol`, `fecha_creacion`) VALUES
(1, 'Alejandro Martínez', 'a.martinez@ferreteria.com', '$2a$10$vO8uwpJndW3jIPVhjoKzRb7MKLryrcIhAzjPskC3hw', 'Administrador', '2026-06-17 04:52:30'),
(2, 'Lucía Torres', 'l.torres@ferreteria.com', '$2a$10$vO8uwpJndW3jIPVhjoKzRb7MKLryrcIhAzjPskC3hw', 'Empleado', '2026-06-17 04:52:30'),
(3, 'Roberto Gómez', 'r.gomez@ferreteria.com', '$2a$10$vO8uwpJndW3jIPVhjoKzRb7MKLryrcIhAzjPskC3hw', 'Empleado', '2026-06-17 04:52:30'),
(4, 'Marta Benítez', 'm.benitez@ferreteria.com', '$2a$10$vO8uwpJndW3jIPVhjoKzRb7MKLryrcIhAzjPskC3hw', 'Empleado', '2026-06-17 04:52:30'),
(5, 'Carlos Almacén', 'c.almacen@ferreteria.com', '$2a$10$vO8uwpJndW3jIPVhjoKzRb7MKLryrcIhAzjPskC3hw', 'Empleado', '2026-06-17 04:52:30'),
(9, 'Majo Ulloa', 'majo4@ferreteria.com', '$2a$10$0Fj43SATkQd2uuJ3ryD2J.OViG/VqAORt8x0SMsE84QIEWGFV7x3i', 'Administrador', '2026-06-18 05:21:14');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `detalle_ordenes`
--
ALTER TABLE `detalle_ordenes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `ordenes_compra`
--
ALTER TABLE `ordenes_compra`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `codigo` (`codigo`);

--
-- Indices de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `detalle_ordenes`
--
ALTER TABLE `detalle_ordenes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `ordenes_compra`
--
ALTER TABLE `ordenes_compra`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
