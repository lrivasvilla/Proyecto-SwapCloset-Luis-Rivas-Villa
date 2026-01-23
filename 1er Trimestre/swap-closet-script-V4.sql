CREATE OR REPLACE TABLE usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(20) NOT NULL,
    apellidos VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(30) NOT NULL,
    descripcion VARCHAR(500),
    estilo VARCHAR(30),
    url_img VARCHAR(500),
    direccion VARCHAR(500),
    t_camiseta VARCHAR(4),
    t_pantalon INT,
    t_calzado INT
);

ALTER TABLE usuario
MODIFY nombre VARCHAR(20) NOT NULL,
MODIFY apellidos VARCHAR(50) NOT NULL,
MODIFY email VARCHAR(50) NOT NULL,
MODIFY password VARCHAR(30) NOT NULL

INSERT INTO usuario (nombre, apellidos, email, password, descripcion, direccion, t_camiseta, t_pantalon, t_calzado, estilo, url_img) values
('Luis', 'Rivas', 'lrivasvilla@safareyes.es', '1234', 'Me encanta salir con mis amigos, tomar algo en terrazas y disfrutar del buen tiempo.', 'Barcelona', 'L', 42, 41, 'Casual, Urbano', 'assets/img/usuarios/img-perfil.png'),
('Ana', 'Lopez', 'ana@mail.com', '1234', 'Apasionada de la moda vintage y los buenos ratos con amigos.', 'Madrid', 'M', 40, 38, 'Vintage, Bohemio', 'assets/img/usuarios/img-perfil-6.png'),
('Marta', 'Perez', 'marta@mail.com', '1234', 'Fanática del deporte, sobre todo el running y el pádel los fines de semana.', 'Valencia', 'S', 38, 36, 'Sport, Casual', 'assets/img/usuarios/img-perfil-7.png'),
('Carlos', 'Ruiz', 'carlos@mail.com', '1234', 'Amante de los viajes, la fotografía y descubrir cafeterías con encanto.', 'Sevilla', 'XL', 44, 42, 'Casual, Viajero', 'assets/img/usuarios/img-perfil-2.png'),
('Lucia', 'Santos', 'lucia@mail.com', '1234', 'Disfruto de las noches de cine en casa, la música indie y las plantas.', 'Bilbao', 'M', 40, 39, 'Bohemio, Minimalista', 'assets/img/usuarios/img-perfil-8.png'),
('Pablo', 'Diaz', 'pablo@mail.com', '1234', 'Apasionado por la cocina, probar nuevos restaurantes y las reuniones familiares.', 'Zaragoza', 'L', 42, 40, 'Casual, Elegante', 'assets/img/usuarios/img-perfil-3.png'),
('Sara', 'Moreno', 'sara@mail.com', '1234', 'Me gusta el arte urbano, los mercadillos y personalizar mi ropa.', 'Malaga', 'S', 38, 37, 'Urbano, Streetwear', 'assets/img/usuarios/img-perfil-9.png'),
('Jorge', 'Navarro', 'jorge@mail.com', '1234', 'Aficionado a la lectura, los podcasts y las caminatas por la montaña.', 'Granada', 'M', 40, 41, 'Outdoor, Casual', 'assets/img/usuarios/img-perfil-4.png'),
('Elena', 'Iglesias', 'elena@mail.com', '1234', 'Entusiasta de la moda sostenible, el yoga y los brunchs dominicales.', 'Vigo', 'XS', 36, 36, 'Sostenible, Bohemio', 'assets/img/usuarios/img-perfil-10.png'),
('David', 'Torres', 'david@mail.com', '1234', 'Fan de los conciertos, los videojuegos y salir a correr al atardecer.', 'Toledo', 'XL', 46, 42, 'Rockero, Sport','assets/img/usuarios/img-perfil-5.png');

CREATE OR REPLACE TABLE producto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo ENUM('intercambio','prestamo') NOT NULL,
    precio DECIMAL(10,2),
    titulo VARCHAR(50) NOT NULL,
    estilo VARCHAR(30) NOT NULL,
    descripcion VARCHAR(500),
    marca VARCHAR(20) NOT NULL,
    estado VARCHAR(20) NOT NULL,
    categoria VARCHAR(20) NOT NULL,
    talla VARCHAR(4) NOT NULL,
    color VARCHAR(20),
    fecha_devolucion DATETIME NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_usuario INT NOT NULL,
    activo BOOLEAN DEFAULT TRUE,
    CONSTRAINT fk_producto_usuario
        FOREIGN KEY (id_usuario)
        REFERENCES usuario(id)
        ON DELETE CASCADE
);

ALTER TABLE producto
MODIFY titulo VARCHAR(50) NOT NULL,
MODIFY estilo VARCHAR(30) NOT NULL,
MODIFY marca VARCHAR(20) NOT NULL,
MODIFY estado VARCHAR(20) NOT NULL,
MODIFY categoria VARCHAR(20) NOT NULL,
MODIFY talla VARCHAR(4) NOT NULL

INSERT INTO producto (tipo, titulo, estilo, descripcion, marca, estado, categoria, talla, color, id_usuario, activo, fecha_devolucion) VALUES
('intercambio','Camisa blanca','casual','Camisa algodón','Zara','bueno','Camisa','M','blanco',1,true,'2025-12-20 21:56:23'),
('intercambio','Chaqueta marrón','casual','Chaqueta invierno','Pull&Bear','muy bueno','Chaqueta','L','marron',2,true,'2026-1-20 21:56:23'),
('intercambio','Chaqueta verde','urbano','Chaqueta ligera','H&M','nuevo','Chaqueta','M','verde',3,true,'2026-2-20 21:56:23'),
('intercambio','Chupa cuero','rock','Cuero auténtico','Levis','bueno','Chaqueta','L','negro',4,true,'2026-3-20 21:56:23'),
('intercambio','Gorra','deportivo','Gorra ajustable','Nike','nuevo','Accesorios','U','negro',5,true,'2026-4-20 21:56:23');

INSERT INTO producto (tipo, titulo, precio, estilo, descripcion, marca, estado, categoria, talla, color, id_usuario, activo, fecha_devolucion) VALUES
('prestamo', 'Pantalones azules', 3, 'casual','Vaqueros slim','Zara','bueno','Pantalón','42','azul',6,true,'2026-5-20 21:56:23'),
('prestamo', 'Sudadera negra',4,'urbano','Sudadera oversize','Adidas','nuevo','Sudadera','L','negro',7,true,'2026-6-20 21:56:23'),
('prestamo', 'Vestido verde',7,'formal','Vestido largo','Mango','muy bueno','Vestido','S','verde',8,true,'2026-7-20 21:56:23'),
('prestamo', 'Zapatillas Nike',5,'deportivo','Running','Nike','bueno','Calzado','42','blanco',9,true,'2026-8-20 21:56:23'),
('prestamo', 'Abrigo largo',12,'formal','Abrigo elegante','Massimo Dutti','muy bueno','Abrigo','M','gris',10,true,'2026-9-20 21:56:23');

CREATE OR REPLACE TABLE raiting (
    id_puntuado INT NOT NULL,
    id_puntuador INT NOT NULL,
    puntuacion INT CHECK (puntuacion BETWEEN 1 AND 5),
    PRIMARY KEY (id_puntuado, id_puntuador),
    CONSTRAINT fk_raiting_puntuado
        FOREIGN KEY (id_puntuado)
        REFERENCES usuario(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_raiting_puntuador
        FOREIGN KEY (id_puntuador)
        REFERENCES usuario(id)
        ON DELETE CASCADE
);

INSERT INTO raiting (id_puntuado, id_puntuador, puntuacion) VALUES
(1,2,5),(2,3,4),(3,4,5),(4,5,3),(5,6,4),
(6,7,5),(7,8,4),(8,9,5),(9,10,4),(10,1,5);


CREATE OR REPLACE TABLE imagen_producto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    url_img VARCHAR(500) NOT NULL,
    orden INT DEFAULT 1,
    id_producto INT NOT NULL,
    CONSTRAINT fk_imagen_producto_producto
        FOREIGN KEY (id_producto)
        REFERENCES producto (id)
        ON DELETE CASCADE
);

INSERT INTO imagen_producto (url_img, id_producto) VALUES
('assets/img/productos/camisa.jpg',1),
('assets/img/productos/chaqueta-marron.JPG',2),
('assets/img/productos/chaqueta-verde.JPG',3),
('assets/img/productos/chupa-cuero.png',4),
('assets/img/productos/gorra.jpg',5),
('assets/img/productos/pantalones-azules.png',6),
('assets/img/productos/sudadera-negra.JPG',7),
('assets/img/productos/vestido-verde.jpg',8),
('assets/img/productos/zapatos-nike.png',9),
('assets/img/productos/chaqueta-marron.JPG',10);


CREATE OR REPLACE TABLE favorito (
    id_usuario INT NOT NULL,
    id_producto INT NOT NULL,
    PRIMARY KEY (id_usuario, id_producto),
    CONSTRAINT fk_favorito_usuario
        FOREIGN KEY (id_usuario)
        REFERENCES usuario (id)
        ON DELETE CASCADE,
    CONSTRAINT fk_favorito_producto
        FOREIGN KEY (id_producto)
        REFERENCES producto (id)
        ON DELETE CASCADE
);

INSERT INTO favorito (id_usuario, id_producto) VALUES
(1,6),(2,7),(3,8),(4,9),(5,10),
(6,1),(7,2),(8,3),(9,4),(10,5);


CREATE OR REPLACE TABLE seguidor (
    id_seguidor INT NOT NULL,   
    id_seguido INT NOT NULL,    
    PRIMARY KEY (id_seguidor, id_seguido),  
    CONSTRAINT fk_seguidores_seguidor
        FOREIGN KEY (id_seguidor) 
        REFERENCES usuario(id)
        ON DELETE CASCADE,   -- El seguidor se elimina si el usuario es eliminado
    
    CONSTRAINT fk_seguidores_seguido
        FOREIGN KEY (id_seguido)
        REFERENCES usuario(id)
        ON DELETE CASCADE    -- El seguido se elimina si el usuario es eliminado
);

INSERT INTO seguidor (id_seguidor, id_seguido) VALUES
(1,2),(2,3),(3,4),(4,5),(5,6),
(6,7),(7,8),(8,9),(9,10),(10,1);

CREATE OR REPLACE TABLE chat (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario1 INT NOT NULL,
    id_usuario2 INT NOT NULL,
    id_producto1 INT NOT NULL,
    id_producto2 INT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    activo BOOLEAN DEFAULT TRUE,
    fecha_quedada DATETIME NULL,
    fecha_devolucion DATETIME NULL,
    ubicacion VARCHAR(100),
    estado ENUM('pendiente','aceptado','devuelto') DEFAULT 'pendiente',
    completado BOOLEAN DEFAULT false,
    CONSTRAINT fk_chat_usuario1
        FOREIGN KEY (id_usuario1)
        REFERENCES usuario (id)
        ON DELETE CASCADE,
    CONSTRAINT fk_chat_usuario2
        FOREIGN KEY (id_usuario2)
        REFERENCES usuario (id)
        ON DELETE CASCADE,
    CONSTRAINT fk_chat_producto1 
        FOREIGN KEY (id_producto1) 
        REFERENCES producto(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_chat_producto2
        FOREIGN KEY (id_producto2)
        REFERENCES producto(id)
        ON DELETE SET NULL
);

ALTER TABLE chat
ADD estado ENUM('pendiente','aceptado','devuelto') DEFAULT 'pendiente'

INSERT INTO chat (id_usuario1,id_usuario2,id_producto1,id_producto2,estado,activo) VALUES
(1,2,1,2,'pendiente',true),
(3,4,3,4,'aceptado',true),
(5,6,5,NULL,'aceptado',true),
(7,8,6,NULL,'pendiente',true),
(9,10,7,NULL,'aceptado',true),
(2,3,8,9,'pendiente',true),
(4,5,10,NULL,'aceptado',true),
(6,7,1,3,'pendiente',true),
(8,9,2,4,'aceptado',true),
(10,1,5,NULL,'pendiente',true);

INSERT INTO chat (id_usuario1,id_usuario2,id_producto1,id_producto2,estado,activo, completado) VALUES
(1,2,1,NULL,'devuelto',false,true),
(2,1,2,NULL,'devuelto',false,true),
(3,1,3,NULL,'devuelto',false,true),
(4,1,4,NULL,'devuelto',false,true);


CREATE OR REPLACE TABLE mensaje (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_chat INT NOT NULL,
    contenido TEXT NOT NULL,
    fecha_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    leido BOOLEAN DEFAULT FALSE,
    CONSTRAINT fk_mensaje_chat 
        FOREIGN KEY (id_chat) 
        REFERENCES chat(id)
        ON DELETE CASCADE
);

INSERT INTO mensaje (id_chat, contenido) VALUES
(1,'Hola!'),(2,'¿Te interesa?'),(3,'Perfecto'),
(4,'Cuando quedamos'),(5,'Todo ok'),
(6,'Gracias'),(7,'Aceptado'),
(8,'Lo miro'),(9,'Genial'),(10,'Hecho');


CREATE OR REPLACE TABLE producto_historico (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_producto INT NULL,
    id_usuario INT NULL,
    tipo ENUM('intercambio','prestamo') NOT NULL,
    accion ENUM('CREADO','ACTUALIZADO','BORRADO','DESACTIVADO') NOT NULL,
    titulo VARCHAR(50),
    estilo VARCHAR(30),
    descripcion VARCHAR(500),
    marca VARCHAR(20),
    categoria VARCHAR(20),
    talla VARCHAR(4),
    color VARCHAR(20),
    precio DECIMAL(10,2),
    fecha_devolucion DATETIME NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_hist_producto
        FOREIGN KEY (id_producto)
        REFERENCES producto(id)
        ON DELETE SET NULL,
    CONSTRAINT fk_hist_usuario
        FOREIGN KEY (id_usuario)
        REFERENCES usuario(id)
        ON DELETE SET NULL
);

INSERT INTO producto_historico (id_producto,id_usuario,tipo,accion,titulo) VALUES
(1,1,'intercambio','CREADO','Camisa blanca'),
(2,2,'intercambio','CREADO','Chaqueta marrón'),
(3,3,'intercambio','CREADO','Chaqueta verde'),
(4,4,'intercambio','CREADO','Chupa cuero'),
(5,5,'intercambio','CREADO','Gorra'),
(6,6,'prestamo','CREADO','Pantalones'),
(7,7,'prestamo','CREADO','Sudadera'),
(8,8,'prestamo','CREADO','Vestido'),
(9,9,'prestamo','CREADO','Zapatillas'),
(10,10,'prestamo','CREADO','Abrigo');


SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE mensaje;
TRUNCATE TABLE chat;
TRUNCATE TABLE favorito;
TRUNCATE TABLE seguidor;
TRUNCATE TABLE imagen_producto;
TRUNCATE TABLE raiting;
TRUNCATE TABLE producto_historico;
TRUNCATE TABLE producto;
TRUNCATE TABLE usuario;

SET FOREIGN_KEY_CHECKS = 1;