CREATE TABLE EDITORIALES (
  editorial_id NUMBER(10) NOT NULL,
  nombre_edit VARCHAR2(50),
  PRIMARY KEY(editorial_id)
);

CREATE TABLE CATEGORIAS (
  categoria_id NUMBER(10) NOT NULL,
  nombre_cat VARCHAR2(50),
  PRIMARY KEY(categoria_id)
);

CREATE TABLE AUTORES (
  autor_id NUMBER(10) NOT NULL,
  nombre_aut VARCHAR2(50),
  apellido_aut VARCHAR2(50),
  PRIMARY KEY(autor_id)
);

CREATE TABLE LIBROS (
  libro_id NUMBER(10) NOT NULL,
  editorial_id NUMBER(10) NOT NULL,
  categoria_id NUMBER(10) NOT NULL,
  autor_id NUMBER(10) NOT NULL,
  titulo VARCHAR2(100),
  paginas NUMBER,
  PRIMARY KEY(libro_id),
  FOREIGN KEY(editorial_id) REFERENCES EDITORIALES(editorial_id),
  FOREIGN KEY(categoria_id) REFERENCES CATEGORIAS(categoria_id),
  FOREIGN KEY(autor_id) REFERENCES AUTORES(autor_id)
);

