-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 28-05-2020 a las 02:49:25
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.4.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `fragance`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `ID_CATEGORIA` int(11) NOT NULL,
  `CATEGORIA` varchar(45) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`ID_CATEGORIA`, `CATEGORIA`) VALUES
(1, 'Mujer'),
(2, 'Hombre');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_venta`
--

CREATE TABLE `detalle_venta` (
  `FACTURA_ID_FACTURA` int(11) NOT NULL,
  `PRODUCTO_ID_PRODUCTO` int(11) NOT NULL,
  `CANTIDAD` int(11) NOT NULL,
  `SUBTOTAL` decimal(18,3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `factura`
--

CREATE TABLE `factura` (
  `ID_FACTURA` int(11) NOT NULL,
  `FECHA` date NOT NULL,
  `TOTAL` decimal(18,0) UNSIGNED NOT NULL,
  `USUARIO_ID_USUARIO` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `ID_PRODUCTO` int(11) NOT NULL,
  `DESCRIPCIO` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `PRECIO` decimal(18,3) NOT NULL,
  `STOCK` int(11) NOT NULL,
  `RUTA_IMG` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `CATEGORIA_ID_CATEGORIA` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`ID_PRODUCTO`, `DESCRIPCIO`, `PRECIO`, `STOCK`, `RUTA_IMG`, `CATEGORIA_ID_CATEGORIA`) VALUES
(1001, 'PERFUME LOCION CHANEL N°5 DE 100ml', '170.999', 15, 'IMG/catalogo/im11.png', 1),
(1002, 'HUGGO BOSS THE ESENCE', '90.000', 7, 'IMG/catalogo/im5.jpg', 2),
(1003, 'FEMME MAGNATE ESIKA', '71.900', 2, 'IMG/catalogo/im12.png', 1),
(1004, 'NITRO BLACK', '70.999', 4, 'IMG/catalogo/im13.png', 2),
(1005, 'LILI BERMUDA', '102.999', 8, 'IMG/catalogo/im2.png', 1),
(1006, 'INVICTUS AQUA (PACO RABANNE)', '20.000', 3, 'IMG/catalogo/im14.png', 2),
(1007, 'INTENSO (DULCE & GABBANA)', '60.900', 7, 'IMG/catalogo/im8.png', 1),
(1008, 'DAVIDOFF COOL WATER', '72.999', 4, 'IMG/catalogo/im3.jpg', 2),
(1010, 'INCOGNITO FOR HIM', '74.999', 10, 'IMG/catalogo/im4.png', 2),
(1011, 'BLUE DE COMPARA', '55.999', 4, 'IMG/catalogo/im6.jpg', 2),
(1013, 'LA COSTE NOIR L12.12', '71.999', 3, 'IMG/catalogo/im15.jpg', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_usuario`
--

CREATE TABLE `tipo_usuario` (
  `ID_TIPO_USUARIO` int(11) NOT NULL,
  `TIPO` varchar(45) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `tipo_usuario`
--

INSERT INTO `tipo_usuario` (`ID_TIPO_USUARIO`, `TIPO`) VALUES
(1, 'estandar'),
(2, 'admin');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `ID_USUARIO` int(11) NOT NULL,
  `CEDULA` int(11) NOT NULL,
  `NOMBRES` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `APELLIDOS` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `EMAIL` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `CONTRASENA` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `TELEFONO` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `DIRECCION` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `TIPO_USUARIO_ID_TIPO_USUARIO` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`ID_USUARIO`, `CEDULA`, `NOMBRES`, `APELLIDOS`, `EMAIL`, `CONTRASENA`, `TELEFONO`, `DIRECCION`, `TIPO_USUARIO_ID_TIPO_USUARIO`) VALUES
(2, 106795445, 'User', 'Admin', 'Admin@gmail.com', '123456', '321529379347', 'MONTERIA-CORDOBA', 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`ID_CATEGORIA`);

--
-- Indices de la tabla `detalle_venta`
--
ALTER TABLE `detalle_venta`
  ADD PRIMARY KEY (`FACTURA_ID_FACTURA`,`PRODUCTO_ID_PRODUCTO`),
  ADD KEY `fk_FACTURA_has_PRODUCTO_PRODUCTO1_idx` (`PRODUCTO_ID_PRODUCTO`),
  ADD KEY `fk_FACTURA_has_PRODUCTO_FACTURA1_idx` (`FACTURA_ID_FACTURA`);

--
-- Indices de la tabla `factura`
--
ALTER TABLE `factura`
  ADD PRIMARY KEY (`ID_FACTURA`,`USUARIO_ID_USUARIO`),
  ADD KEY `fk_FACTURA_USUARIO1_idx` (`USUARIO_ID_USUARIO`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`ID_PRODUCTO`,`CATEGORIA_ID_CATEGORIA`),
  ADD KEY `fk_PRODUCTO_CATEGORIA1_idx` (`CATEGORIA_ID_CATEGORIA`);

--
-- Indices de la tabla `tipo_usuario`
--
ALTER TABLE `tipo_usuario`
  ADD PRIMARY KEY (`ID_TIPO_USUARIO`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`ID_USUARIO`,`TIPO_USUARIO_ID_TIPO_USUARIO`),
  ADD KEY `fk_USUARIO_TIPO_USUARIO_idx` (`TIPO_USUARIO_ID_TIPO_USUARIO`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `ID_CATEGORIA` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1012;

--
-- AUTO_INCREMENT de la tabla `tipo_usuario`
--
ALTER TABLE `tipo_usuario`
  MODIFY `ID_TIPO_USUARIO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `ID_USUARIO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=137;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `detalle_venta`
--
ALTER TABLE `detalle_venta`
  ADD CONSTRAINT `fk_FACTURA_has_PRODUCTO_FACTURA1` FOREIGN KEY (`FACTURA_ID_FACTURA`) REFERENCES `factura` (`ID_FACTURA`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_FACTURA_has_PRODUCTO_PRODUCTO1` FOREIGN KEY (`PRODUCTO_ID_PRODUCTO`) REFERENCES `producto` (`ID_PRODUCTO`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `factura`
--
ALTER TABLE `factura`
  ADD CONSTRAINT `fk_FACTURA_USUARIO1` FOREIGN KEY (`USUARIO_ID_USUARIO`) REFERENCES `usuario` (`ID_USUARIO`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `fk_PRODUCTO_CATEGORIA1` FOREIGN KEY (`CATEGORIA_ID_CATEGORIA`) REFERENCES `categoria` (`ID_CATEGORIA`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `fk_USUARIO_TIPO_USUARIO` FOREIGN KEY (`TIPO_USUARIO_ID_TIPO_USUARIO`) REFERENCES `tipo_usuario` (`ID_TIPO_USUARIO`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
