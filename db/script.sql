CREATE DATABASE desafioharrypotter;

CREATE TABLE bruxos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    idade INTEGER NOT NULL,
    casa VARCHAR(100) NOT NULL,
    habilidade VARCHAR(100) NOT NULL,
    statusdesangue VARCHAR(100) NOT NULL
);

CREATE TABLE propriedadesvarinha (
    id SERIAL PRIMARY KEY,
    material VARCHAR(100) NOT NULL,
    comprimento VARCHAR(100) NOT NULL,
    nucleo VARCHAR(100) NOT NULL,
    datadefabricacao DATE NOT NULL
);

INSERT INTO bruxos (nome, idade, casa, habilidade, statusdesangue) VALUES ('Ana Potter', 17, 'Sonserina', 'Ser linda', 'Trouxa');

INSERT INTO propriedadesvarinha (material, comprimento, nucleo, datadefabricacao) VALUES ('Madeira', '1,36', 'pelo de unicornio', '1986-11-20');