CREATE DATABASE React;
USE React;

CREATE TABLE personas 
(
	idpersona		SMALLINT AUTO_INCREMENT PRIMARY KEY,
	apellidos		VARCHAR(40) 	NOT NULL,
	nombres			VARCHAR(40) 	NOT NULL,
	tipodocumento		VARCHAR(20)	NOT NULL,
	nrodocumento		CHAR(8)	   	NOT NULL,
	telefono		CHAR(9)		NOT NULL,
	direccion		VARCHAR(200)	NOT NULL,
	estado			CHAR(1)		NOT NULL DEFAULT '1',
	fechanac		DATE 		NOT NULL,
	fecha_create		DATETIME 	NOT NULL DEFAULT NOW(),
	fechabaja		DATETIME	NULL
)ENGINE = INNODB;

INSERT INTO personas (apellidos,nombres,tipodocumento,nrodocumento,telefono,direccion,fechanac)
VALUES('Marquina Jaime','Ángel Eduardo','DNI','72745028','951531166','León de Vivero MZ V L-2','2004-07-10'),
	('Padilla Chumbiauca','Marks Steven','DNI','72854857','924563458','Atrás de plaza vea','2004-06-07'),
	('Uribe Garcia','Cristhian Manuel','DNI','72548675','95123654','Rosedal por donde roban','2004-05-21'),
	('Chacaliaza Pachas','Ítalo Jesús','DNI','7254789','963214587','AV. Santos Nagaro 210','2003-10-29'),
	('Marquina Jaime','Emily Fernanda','DNI','78383886','952145879','León de Vivero Mz V LT-22','2013-12-16');
SELECT * FROM personas;

CREATE TABLE empleados(
 id 		INT AUTO_INCREMENT PRIMARY KEY,
 nombre		VARCHAR(40) 	NOT NULL,
 edad 		INT 		NOT NULL,
 pais		VARCHAR(40)	NOT NULL,
 cargo		VARCHAR(40)	NOT NULL,
 anios		INT 		NOT NULL,
 fecha_create	DATETIME 	NOT NULL DEFAULT NOW()
)ENGINE = INNODB;

