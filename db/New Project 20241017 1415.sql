-- MySQL Administrator dump 1.4
--
-- ------------------------------------------------------
-- Server version	5.0.21-community-nt


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


--
-- Create schema myplan_jobpost
--

CREATE DATABASE IF NOT EXISTS myplan_jobpost;
USE myplan_jobpost;

--
-- Definition of table `aplicarofertas`
--

DROP TABLE IF EXISTS `aplicarofertas`;
CREATE TABLE `aplicarofertas` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `idcandidato` varchar(30) NOT NULL,
  `idoferta` int(10) unsigned NOT NULL,
  `fecha` date NOT NULL,
  `idcv` varchar(500) NOT NULL,
  `activa` int(10) unsigned NOT NULL,
  `idempresa` int(10) unsigned NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `aplicarofertas`
--

/*!40000 ALTER TABLE `aplicarofertas` DISABLE KEYS */;
INSERT INTO `aplicarofertas` (`id`,`idcandidato`,`idoferta`,`fecha`,`idcv`,`activa`,`idempresa`) VALUES 
 (1,'usuario01',1,'2024-10-14','1',1,1),
 (2,'usuario01',2,'2024-10-17','1',1,1);
/*!40000 ALTER TABLE `aplicarofertas` ENABLE KEYS */;


--
-- Definition of table `candidato`
--

DROP TABLE IF EXISTS `candidato`;
CREATE TABLE `candidato` (
  `usuario` varchar(50) NOT NULL,
  `clave` varchar(45) NOT NULL,
  `apellido` varchar(25) NOT NULL,
  `nombre` varchar(25) NOT NULL,
  `pais` int(10) unsigned NOT NULL,
  `departamento` int(10) unsigned default NULL,
  `municipio` int(10) unsigned NOT NULL,
  `fech_nacim` date NOT NULL,
  `telefono` varchar(50) NOT NULL,
  `correo` varchar(50) NOT NULL,
  `linkedin` mediumtext,
  `usuariotipo` int(10) unsigned NOT NULL default '2',
  PRIMARY KEY  (`usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `candidato`
--

/*!40000 ALTER TABLE `candidato` DISABLE KEYS */;
INSERT INTO `candidato` (`usuario`,`clave`,`apellido`,`nombre`,`pais`,`departamento`,`municipio`,`fech_nacim`,`telefono`,`correo`,`linkedin`,`usuariotipo`) VALUES 
 ('usuario01','123','Pérez','Juan',1,10,101,'1990-05-12','555-123-4567','juan.perez@email.com','https://www.linkedin.com/in/juanperez',2),
 ('usuario02','claveSegura456','García','Ana',1,12,102,'1988-08-24','555-987-6543','ana.garcia@email.com','https://www.linkedin.com/in/anagarcia',2),
 ('usuario03','claveSegura789','López','Carlos',2,11,103,'1992-12-02','555-654-3210','carlos.lopez@email.com','https://www.linkedin.com/in/carloslopez',2),
 ('usuario04','claveSegura012','Rodríguez','María',3,12,104,'1995-03-15','555-321-0987','maria.rodriguez@email.com','https://www.linkedin.com/in/mariarodriguez',2),
 ('usuario05','claveSegura345','Hernández','Lara',1,15,105,'1993-07-22','555-543-2109','javier.hernandez@email.com','https://www.linkedin.com/in/javierhernandez',2);
/*!40000 ALTER TABLE `candidato` ENABLE KEYS */;


--
-- Definition of table `candidato_oferta`
--

DROP TABLE IF EXISTS `candidato_oferta`;
CREATE TABLE `candidato_oferta` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `idcandidato` int(10) unsigned NOT NULL,
  `idoferta` int(10) unsigned NOT NULL,
  `fechasolic` datetime NOT NULL,
  `fecharevision` datetime NOT NULL,
  `estado` int(10) unsigned NOT NULL,
  `retroalimentacion` mediumtext NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `candidato_oferta`
--

/*!40000 ALTER TABLE `candidato_oferta` DISABLE KEYS */;
/*!40000 ALTER TABLE `candidato_oferta` ENABLE KEYS */;


--
-- Definition of table `cv_candidatos`
--

DROP TABLE IF EXISTS `cv_candidatos`;
CREATE TABLE `cv_candidatos` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `usuario` varchar(60) NOT NULL,
  `nombre` varchar(60) NOT NULL,
  `rutacv` varchar(45) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cv_candidatos`
--

/*!40000 ALTER TABLE `cv_candidatos` DISABLE KEYS */;
INSERT INTO `cv_candidatos` (`id`,`usuario`,`nombre`,`rutacv`) VALUES 
 (1,'usuario01','juan-perez','ADMIN3_N-juan-perez.pdf'),
 (2,'ADMIN4','juan-perez','ADMIN4_N-juan-perez.pdf'),
 (3,'gerarld','geraldine-suarez','gerarld_N-geraldine-suarez.pdf'),
 (4,'Juanelpro','juan-hernandez','Juanelpro_N-juan-hernandez.pdf'),
 (5,'prueba','juan-hernandez','prueba_N-juan-hernandez.pdf'),
 (6,'usuario32','Juan-Vazques','usuario32_N-Juan-Vazques.pdf'),
 (7,'usuariodeprueba1','usuario-prueba','usuariodeprueba1_N-usuario-prueba.pdf');
/*!40000 ALTER TABLE `cv_candidatos` ENABLE KEYS */;


--
-- Definition of table `departamento`
--

DROP TABLE IF EXISTS `departamento`;
CREATE TABLE `departamento` (
  `id_departamento` int(11) NOT NULL auto_increment,
  `nombre_departamento` varchar(100) NOT NULL,
  PRIMARY KEY  (`id_departamento`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `departamento`
--

/*!40000 ALTER TABLE `departamento` DISABLE KEYS */;
INSERT INTO `departamento` (`id_departamento`,`nombre_departamento`) VALUES 
 (1,'Ahuachapán'),
 (2,'San Salvador'),
 (3,'La Libertad'),
 (4,'Chalatenango'),
 (5,'Cuscatlán'),
 (6,'Cabañas'),
 (7,'La Paz'),
 (8,'La Unión'),
 (9,'Usulután'),
 (10,'Sonsonate'),
 (11,'Santa Ana'),
 (12,'San Vicente'),
 (13,'San Miguel'),
 (14,'Morazán');
/*!40000 ALTER TABLE `departamento` ENABLE KEYS */;


--
-- Definition of table `distrito`
--

DROP TABLE IF EXISTS `distrito`;
CREATE TABLE `distrito` (
  `id_distrito` int(11) NOT NULL auto_increment,
  `nombre_distrito` varchar(100) NOT NULL,
  `id_municipio` int(11) default NULL,
  PRIMARY KEY  (`id_distrito`),
  KEY `id_municipio` (`id_municipio`),
  CONSTRAINT `distrito_ibfk_1` FOREIGN KEY (`id_municipio`) REFERENCES `municipio` (`id_municipio`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `distrito`
--

/*!40000 ALTER TABLE `distrito` DISABLE KEYS */;
INSERT INTO `distrito` (`id_distrito`,`nombre_distrito`,`id_municipio`) VALUES 
 (1,'Atiquizaya',1),
 (2,'El Refugio',1),
 (3,'San Lorenzo',1),
 (4,'Turín',1),
 (5,'Ahuachapán',2),
 (6,'Apaneca',2),
 (7,'Concepción de Ataco',2),
 (8,'Tacuba',2),
 (9,'Guaymango',3),
 (10,'Jujutla',3),
 (11,'San Francisco Menéndez',3),
 (12,'San Pedro Puxtla',3),
 (13,'Aguilares',4),
 (14,'El Paisnal',4),
 (15,'Guazapa',4),
 (16,'Apopa',5),
 (17,'Nejapa',5),
 (18,'Ilopango',6),
 (19,'San Martín',6),
 (20,'Soyapango',6),
 (21,'Tonacatepeque',6),
 (22,'Ayutuxtepeque',7),
 (23,'Mejicanos',7),
 (24,'San Salvador',7),
 (25,'Cuscatancingo',7),
 (26,'Ciudad Delgado',7),
 (27,'Panchimalco',8),
 (28,'Rosario de Mora',8),
 (29,'San Marcos',8),
 (30,'Santo Tomás',8),
 (31,'Santiago Texacuangos',8),
 (32,'Quezaltepeque',9),
 (33,'San Matías',9),
 (34,'San Pablo Tacachico',9),
 (35,'San Juan Opico',10),
 (36,'Ciudad Arce',10),
 (37,'Colón',11),
 (38,'Jayaque',11),
 (39,'Sacacoyo',11),
 (40,'Tepecoyo',11),
 (41,'Talnique',11),
 (42,'Antiguo Cuscatlán',12),
 (43,'Huizúcar',12),
 (44,'Nuevo Cuscatlán',12),
 (45,'San José Villanueva',12),
 (46,'Zaragoza',12),
 (47,'Chiltuipán',13),
 (48,'Jicalapa',13),
 (49,'La Libertad',13),
 (50,'Tamanique',13),
 (51,'Teotepeque',13),
 (52,'Comasagua',14),
 (53,'Santa Tecla',14),
 (54,'La Palma',15),
 (55,'Citalá',15),
 (56,'San Ignacio',15),
 (57,'Nueva Concepción',16),
 (58,'Tejutla',16),
 (59,'La Reina',16),
 (60,'Agua Caliente',16),
 (61,'Dulce Nombre de María',16),
 (62,'El Paraíso',16),
 (63,'San Francisco Morazán',16),
 (64,'San Rafael',16),
 (65,'Santa Rita',16),
 (66,'San Fernando',16),
 (67,'Chalatenango',17),
 (68,'Arcatao',17),
 (69,'Azacualpa',17),
 (70,'Comalapa',17),
 (71,'Concepción Quezaltepeque',17),
 (72,'El Carrizal',17),
 (73,'La Laguna',17),
 (74,'Las Vueltas',17),
 (75,'Nombre de Jesús',17),
 (76,'Nueva Trinidad',17),
 (77,'Ojos de Agua',17),
 (78,'Potonico',17),
 (79,'San Antonio de La Cruz',17),
 (80,'San Antonio Los Ranchos',17),
 (81,'San Francisco Lempa',17),
 (82,'San Isidro Labrador',17),
 (83,'San José Cancasque',17),
 (84,'San Miguel de Mercedes',17),
 (85,'San José Las Flores',17),
 (86,'San Luis del Carmen',17),
 (87,'Ahuachapán Norte',1),
 (88,'Ahuachapán Centro',1),
 (89,'Ahuachapán Sur',1),
 (90,'San Salvador Norte',2),
 (91,'San Salvador Oeste',2),
 (92,'San Salvador Este',2),
 (93,'San Salvador Centro',2),
 (94,'San Salvador Sur',2),
 (95,'La Libertad Norte',3),
 (96,'La Libertad Centro',3),
 (97,'La Libertad Oeste',3),
 (98,'La Libertad Este',3),
 (99,'La Libertad Costa',3),
 (100,'La Libertad Sur',3),
 (101,'Chalatenango Norte',4),
 (102,'Chalatenango Centro',4),
 (103,'Chalatenango Sur',4);
/*!40000 ALTER TABLE `distrito` ENABLE KEYS */;


--
-- Definition of table `empleador`
--

DROP TABLE IF EXISTS `empleador`;
CREATE TABLE `empleador` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `nombre` varchar(150) NOT NULL,
  `direccion` varchar(150) NOT NULL,
  `telefono` varchar(50) NOT NULL,
  `correo` varchar(50) NOT NULL,
  `usuario` varchar(30) NOT NULL,
  `clave` varchar(50) NOT NULL,
  `rep` varchar(45) NOT NULL,
  `logoruta` varchar(200) default 'Sin Logo ',
  `usuariotipo` int(10) unsigned NOT NULL default '1',
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `empleador`
--

/*!40000 ALTER TABLE `empleador` DISABLE KEYS */;
INSERT INTO `empleador` (`id`,`nombre`,`direccion`,`telefono`,`correo`,`usuario`,`clave`,`rep`,`logoruta`,`usuariotipo`) VALUES 
 (1,'SYSCOME S.A. DE C.V.','Calle 123, Ciudad de México','+5032229-7973','ernesto.padilla@outlook.com','epadilla','123asd','Ernesto Padilla','logo_alpha.png',1),
 (11,'Avancemos','Santa Tecla #23','2393-2722','syscomeatencionalcliente2.0@gmail.com','juan.perez@avancemos.com','123','Juan Perez','_E-Avancemos.png',1);
/*!40000 ALTER TABLE `empleador` ENABLE KEYS */;


--
-- Definition of table `estado`
--

DROP TABLE IF EXISTS `estado`;
CREATE TABLE `estado` (
  `idestado` int(10) unsigned NOT NULL auto_increment,
  `descripcion` varchar(50) NOT NULL,
  PRIMARY KEY  (`idestado`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `estado`
--

/*!40000 ALTER TABLE `estado` DISABLE KEYS */;
INSERT INTO `estado` (`idestado`,`descripcion`) VALUES 
 (1,'Hoja de Vida Entregada a Empleador'),
 (2,'Empleador Revisó su Curriculum'),
 (3,'Empleador Calificó'),
 (4,'No Aplica para Siguiente Paso'),
 (5,'Su Curriculum fue Seleccionado');
/*!40000 ALTER TABLE `estado` ENABLE KEYS */;


--
-- Definition of table `municipio`
--

DROP TABLE IF EXISTS `municipio`;
CREATE TABLE `municipio` (
  `id_municipio` int(11) NOT NULL auto_increment,
  `nombre_municipio` varchar(100) NOT NULL,
  `id_departamento` int(11) default NULL,
  PRIMARY KEY  (`id_municipio`),
  KEY `id_departamento` (`id_departamento`),
  CONSTRAINT `municipio_ibfk_1` FOREIGN KEY (`id_departamento`) REFERENCES `departamento` (`id_departamento`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `municipio`
--

/*!40000 ALTER TABLE `municipio` DISABLE KEYS */;
INSERT INTO `municipio` (`id_municipio`,`nombre_municipio`,`id_departamento`) VALUES 
 (1,'Ahuachapán Norte',1),
 (2,'Ahuachapán Centro',1),
 (3,'Ahuachapán Sur',1),
 (4,'San Salvador Norte',2),
 (5,'San Salvador Oeste',2),
 (6,'San Salvador Este',2),
 (7,'San Salvador Centro',2),
 (8,'San Salvador Sur',2),
 (9,'La Libertad Norte',3),
 (10,'La Libertad Centro',3),
 (11,'La Libertad Oeste',3),
 (12,'La Libertad Este',3),
 (13,'La Libertad Costa',3),
 (14,'La Libertad Sur',3),
 (15,'Chalatenango Norte',4),
 (16,'Chalatenango Centro',4),
 (17,'Chalatenango Sur',4);
/*!40000 ALTER TABLE `municipio` ENABLE KEYS */;


--
-- Definition of table `niveleducativo`
--

DROP TABLE IF EXISTS `niveleducativo`;
CREATE TABLE `niveleducativo` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `nivel` varchar(150) NOT NULL,
  `descripcion` mediumtext NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `niveleducativo`
--

/*!40000 ALTER TABLE `niveleducativo` DISABLE KEYS */;
INSERT INTO `niveleducativo` (`id`,`nivel`,`descripcion`) VALUES 
 (1,'Sin Estudios','No se requiere ningún nivel educativo formal.'),
 (2,'Educación Primaria','Completa la educación primaria o equivalente.'),
 (3,'Educación Secundaria','Completa la educación secundaria o equivalente.'),
 (4,'Bachillerato','Completa el bachillerato o educación media superior.'),
 (5,'Técnico Superior','Título de técnico superior o equivalente.'),
 (6,'Licenciatura','Título universitario a nivel de licenciatura.'),
 (7,'Maestría','Título de posgrado a nivel de maestría.'),
 (8,'Doctorado','Título de posgrado a nivel de doctorado.'),
 (9,'Cursos/Certificaciones','Certificaciones o cursos especializados.');
/*!40000 ALTER TABLE `niveleducativo` ENABLE KEYS */;


--
-- Definition of table `ofertaofrecimiento`
--

DROP TABLE IF EXISTS `ofertaofrecimiento`;
CREATE TABLE `ofertaofrecimiento` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `idoferta` int(10) unsigned NOT NULL,
  `descripcion` varchar(100) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ofertaofrecimiento`
--

/*!40000 ALTER TABLE `ofertaofrecimiento` DISABLE KEYS */;
INSERT INTO `ofertaofrecimiento` (`id`,`idoferta`,`descripcion`) VALUES 
 (1,1,'ISSS, AFP y todos los descuentos de ley'),
 (2,1,'Capacitación Constante'),
 (3,1,'Oportunidad de Crecimiento');
/*!40000 ALTER TABLE `ofertaofrecimiento` ENABLE KEYS */;


--
-- Definition of table `ofertasempleo`
--

DROP TABLE IF EXISTS `ofertasempleo`;
CREATE TABLE `ofertasempleo` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `titulo` mediumtext NOT NULL,
  `ubicacion` mediumtext NOT NULL,
  `pagomin` decimal(12,2) NOT NULL,
  `pagomax` decimal(12,2) NOT NULL,
  `idempress` int(10) unsigned default '0',
  `epiccalling` mediumtext NOT NULL,
  `desde` date NOT NULL,
  `hasta` date NOT NULL,
  `plazas` int(10) unsigned NOT NULL,
  `contrato` int(10) unsigned NOT NULL,
  `edadmin` int(10) unsigned default '0',
  `edadmax` int(10) unsigned default '0',
  `niveleduc` int(10) unsigned default '1',
  `activo` int(10) unsigned NOT NULL default '1',
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ofertasempleo`
--

/*!40000 ALTER TABLE `ofertasempleo` DISABLE KEYS */;
INSERT INTO `ofertasempleo` (`id`,`titulo`,`ubicacion`,`pagomin`,`pagomax`,`idempress`,`epiccalling`,`desde`,`hasta`,`plazas`,`contrato`,`edadmin`,`edadmax`,`niveleduc`,`activo`) VALUES 
 (1,'Desarrollador c#','San Salvador','400.00','1000.00',1,'Quiere crear la tecnología del mañana para las nuevas empresas que empezarán en El Salvador?','2024-10-01','2024-10-30',2,1,20,30,5,1),
 (2,'Desarrollador Backend','San Salvador','300.00','500.00',1,'','2024-10-01','2024-10-30',1,0,0,0,0,1),
 (3,'Analista de Datos','San Salvador','350.00','450.00',1,'','2024-10-01','2024-10-30',1,0,0,0,0,1),
 (4,'Diseñador UI/UX','San Salvador','400.00','600.00',1,'','2024-10-01','2024-10-30',3,0,0,0,0,1),
 (5,'Ingeniero DevOps','Santa Tecla','450.00','650.00',11,'Crea  la nueva tecnolog(i)a para mejorar el ma(n)ana','2024-10-01','2024-10-30',1,0,0,0,0,1),
 (39,'Programador Jr','Santa Tecla ','400.00','1200.00',11,'Crea  la nueva tecnolog(i)a para mejorar el ma(n)ana','2024-10-10','2024-10-30',1,3,0,0,0,1);
/*!40000 ALTER TABLE `ofertasempleo` ENABLE KEYS */;


--
-- Definition of table `pais`
--

DROP TABLE IF EXISTS `pais`;
CREATE TABLE `pais` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `nombre` varchar(100) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `pais`
--

/*!40000 ALTER TABLE `pais` DISABLE KEYS */;
INSERT INTO `pais` (`id`,`nombre`) VALUES 
 (1,'Seleccione su país'),
 (2,'El Salvador'),
 (3,'Guatemala');
/*!40000 ALTER TABLE `pais` ENABLE KEYS */;


--
-- Definition of table `preguntasaempleador`
--

DROP TABLE IF EXISTS `preguntasaempleador`;
CREATE TABLE `preguntasaempleador` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `referenteid` int(10) unsigned NOT NULL,
  `detalle` mediumtext NOT NULL,
  `empleador` int(10) unsigned NOT NULL,
  `respuestaempleador` mediumtext NOT NULL,
  `publicar` int(10) unsigned NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `preguntasaempleador`
--

/*!40000 ALTER TABLE `preguntasaempleador` DISABLE KEYS */;
/*!40000 ALTER TABLE `preguntasaempleador` ENABLE KEYS */;


--
-- Definition of table `requisitos`
--

DROP TABLE IF EXISTS `requisitos`;
CREATE TABLE `requisitos` (
  `idreq` int(10) unsigned NOT NULL auto_increment,
  `idoferta` int(10) unsigned NOT NULL,
  `descripcion` varchar(100) NOT NULL,
  PRIMARY KEY  (`idreq`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `requisitos`
--

/*!40000 ALTER TABLE `requisitos` DISABLE KEYS */;
INSERT INTO `requisitos` (`idreq`,`idoferta`,`descripcion`) VALUES 
 (1,1,'Graduado de Técnico o Superior'),
 (2,1,'Edad: 22-35 años'),
 (3,1,'Sin problemas para Viajar fuera de San Salvador');
/*!40000 ALTER TABLE `requisitos` ENABLE KEYS */;


--
-- Definition of table `retroalimentaciones`
--

DROP TABLE IF EXISTS `retroalimentaciones`;
CREATE TABLE `retroalimentaciones` (
  `idretro` int(10) unsigned NOT NULL auto_increment,
  `retroalimentacion` mediumtext NOT NULL,
  PRIMARY KEY  (`idretro`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `retroalimentaciones`
--

/*!40000 ALTER TABLE `retroalimentaciones` DISABLE KEYS */;
INSERT INTO `retroalimentaciones` (`idretro`,`retroalimentacion`) VALUES 
 (1,'Su CV no cumple con todos los requisitios.'),
 (2,'Su CV si cumple con los requisitos, sin embargo, lamentamos informarle que ya fue dada la plaza'),
 (3,'Su CV es excelente y se le contactará en breve'),
 (4,'Las Referencias que colocó en su CV no se pudieron contactar'),
 (5,'');
/*!40000 ALTER TABLE `retroalimentaciones` ENABLE KEYS */;


--
-- Definition of table `tipocontrato`
--

DROP TABLE IF EXISTS `tipocontrato`;
CREATE TABLE `tipocontrato` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `nombre` varchar(100) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tipocontrato`
--

/*!40000 ALTER TABLE `tipocontrato` DISABLE KEYS */;
INSERT INTO `tipocontrato` (`id`,`nombre`) VALUES 
 (1,'Contrato Permanente'),
 (2,'Temporal'),
 (3,'Prácticas');
/*!40000 ALTER TABLE `tipocontrato` ENABLE KEYS */;




/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
