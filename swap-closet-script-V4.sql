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

